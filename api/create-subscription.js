import Stripe from 'stripe';

// Home Exterior Plans (about 15% off regular prices, cancel anytime).
// Prices are set here on the server so the browser can't change them. Recurring prices are
// created once in Stripe (found again by lookup key), so they show up as real products in the
// Stripe dashboard.
const PLANS = {
  curb_appeal: {
    lookup: 'mcs_home_curb_appeal_95',
    name: 'Magic City Home Plan: Curb Appeal',
    amount: 9500,
    label: 'Curb Appeal, $95/mo',
    includes: 'Driveway and walkways 4x a year, house wash 1x a year',
  },
  full_exterior: {
    lookup: 'mcs_home_full_exterior_139',
    name: 'Magic City Home Plan: Full Exterior',
    amount: 13900,
    label: 'Full Exterior, $139/mo',
    includes: 'Driveway and walkways 4x, house wash 1x, pool deck 2x, gutters 2x a year',
  },
  estate: {
    lookup: 'mcs_home_estate_189',
    name: 'Magic City Home Plan: Estate',
    amount: 18900,
    label: 'Estate, $189/mo',
    includes: 'Full Exterior plus a yearly roof soft wash and windows 1x a year',
  },
};

// Retired Oct 19, 2026 (old $69 plan and $30 roof add-on). Switched off so nobody can buy them.
const RETIRED = ['mcs_home_exterior_plan_69', 'mcs_home_plan_roof_addon_30'];

async function retireOldPrices(stripe) {
  try {
    const old = await stripe.prices.list({ lookup_keys: RETIRED, active: true, limit: 10 });
    await Promise.all(old.data.map(p => stripe.prices.update(p.id, { active: false })));
  } catch (err) {
    console.error('Could not retire old prices:', err.message);
  }
}

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
    const { plan: planId, customerName, customerEmail, customerPhone, address } = req.body || {};
    const plan = PLANS[planId];
    if (!plan) return res.status(400).json({ error: 'Unknown plan' });
    if (!customerEmail || !customerName || !customerPhone || !address) return res.status(400).json({ error: 'Missing contact details' });

    await retireOldPrices(stripe);
    const priceId = await recurringPrice(stripe, plan);

    const meta = {
      plan: planId,
      includes: plan.includes,
      customerName: String(customerName).slice(0, 200),
      customerPhone: String(customerPhone).slice(0, 50),
      serviceAddress: String(address).slice(0, 400),
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        description: `${plan.label}. ${plan.includes}. Cancel anytime.`,
        metadata: meta,
      },
      metadata: meta,
      custom_text: {
        submit: {
          message: `${plan.includes}. For homes up to about 2,000 sq ft. Cancel anytime. If you cancel after receiving more service than you've paid for, the difference is billed at member prices.`,
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
