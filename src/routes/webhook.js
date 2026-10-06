// src/routes/webhook.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const event = req.body;
  if (event.type === 'checkout.session.completed') {
    return res.json({ updatedPlan: event.data.object.plan });
  }
  res.status(400).json({ error: 'Unhandled event type' });
});

module.exports = router;
