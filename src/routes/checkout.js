const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);

router.post('/', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: 'price_test', quantity: 1 }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe error' });
  }
});

module.exports = router;
