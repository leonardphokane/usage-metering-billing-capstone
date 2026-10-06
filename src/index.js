// src/index.js
require('dotenv').config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const express = require('express');
const usageRoutes = require('./routes/usage');
const checkoutRoutes = require('./routes/checkout');
const webhookRoutes = require('./routes/webhook');

const app = express();
app.use(express.json());

app.use('/usage', usageRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/webhook', webhookRoutes);

module.exports = app;
