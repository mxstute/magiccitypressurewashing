import Stripe from 'stripe';

// Deposit amounts are set here on the server so the browser can't change them.
const DEPOSITS = {
  'Driveway / Sidewalk': 50,
  'House Exterior (1-Story)': 75,
  'House Exterior (2-Story)': 250,
  'Pool Deck / Patio': 50,
  'Roof Soft Wash (Shingle)': 225,
  'Roof Soft Wash (Tile)': 275,
  'Roof Soft Wash (2-Story Tile)': 400,
  'Full Property Package': 600,
  'Fence / Wall Cleaning': 40,
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Stripe not configured' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { packageName, customerName, customerEmail, customerPhone, date, time, address } = req.body;

    if (!packageName || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const deposit = DEPOSITS[packageName];
    if (!deposit) {
      return res.status(400).json({ error: 'Unknown package' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Magic City Pressure Washing — ${packageName}`,
            description: `Deposit for ${packageName}. Date: ${date || 'TBD'} at ${time || 'TBD'}.`,
          },
          unit_amount: Math.round(deposit * 100),
        },
        quantity: 1,
      }],
      metadata: {
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        preferredDate: date || '',
        preferredTime: time || '',
        serviceAddress: address || '',
        package: packageName,
      },
      success_url: `${req.headers.origin || 'https://magiccitypressurewashingmiami.com'}?booking=success`,
      cancel_url: `${req.headers.origin || 'https://magiccitypressurewashingmiami.com'}?booking=cancelled`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
