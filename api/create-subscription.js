import Stripe from 'stripe';

// Home Exterior Plan. Prices are set here on the server so the browser can't change them.
// Recurring prices are created once in Stripe (found again by lookup key), so they show up as
// real products in the Stripe dashboard.
const HOME_PLAN = {
  lookup: 'mcs_home_exterior_plan_69',
  name: 'Magic City Home Exterior Plan (homes up to 2,000 sq ft)',
  amount: 6900,
  label: 'Home Exterior Plan, $69/mo',
};
const ROOF_ADDON = {
  lookup: 'mcs_home_plan_roof_addon_30',
  name: 'Home Exterior Plan roof add-on (yearly roof soft wash)',
  amount: 3000,
  label: 'Roof add-on, $30/mo',
};

async function recurringPrice(stripe, plan) {
  const found = await stripe.prices.list({ lookup_keys: [plan.lookup], active: true, limit: 1 });
  if (found.data.length) return found.data[0].id;
  try {
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: plan.amount,
      recurring: { interval: 'month' },
      lookup_key: plan.lookup,
      nickname: plan.label,
      product_data: { name: plan.name },
    });
    return price.id;
  } catch (err) {
    const again = await stripe.prices.list({ lookup_keys: [plan.lookup], active: true, limit: 1 });
    if (again.data.length) return again.data[0].id;
    throw err;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Stripe not configured' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.origin || 'https://magiccitypressurewashingmiami.com';

  try {
    const { roof, customerName, customerEmail, customerPhone, address } = req.body || {};
    if (!customerEmail || !customerName || !customerPhone || !address) return res.status(400).json({ error: 'Missing contact details' });

    const lineItems = [{ price: await recurringPrice(stripe, HOME_PLAN), quantity: 1 }];
    if (roof) lineItems.push({ price: await recurringPrice(stripe, ROOF_ADDON), quantity: 1 });

    const meta = {
      plan: roof ? 'home_plan_with_roof' : 'home_plan',
      customerName: String(customerName).slice(0, 200),
      customerPhone: String(customerPhone).slice(0, 50),
      serviceAddress: String(address).slice(0, 400),
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      line_items: lineItems,
      subscription_data: {
        description: `${roof ? 'Home Exterior Plan with roof add-on' : 'Home Exterior Plan'}. 12-month plan.`,
        metadata: meta,
      },
      metadata: meta,
      custom_text: {
        submit: {
          message: 'Billed monthly as a 12-month plan; if you cancel early, the rest of the 12 months is due. Includes driveway and walkways every 3 months, pool deck twice a year, a house wash once a year, and 15% off other services. For homes up to about 2,000 sq ft.',
        },
      },
      success_url: `${origin}/?member=success`,
      cancel_url: `${origin}/#plan`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe subscription error:', error);
    res.status(500).json({ error: error.message });
  }
}
