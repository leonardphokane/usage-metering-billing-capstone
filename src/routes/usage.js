// src/routes/usage.js
const express = require('express');
const router = express.Router();
const db = require('../db/pool');

router.post('/', async (req, res) => {
  try {
    const { tenantId, eventKey, apiCalls = 0, tokens = 0 } = req.body;

    // Fetch tenant quotas
    const tenantResult = await db.query('SELECT * FROM tenants WHERE id = $1', [tenantId]);
    if (tenantResult.rows.length === 0) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    const tenant = tenantResult.rows[0];

    // Aggregate usage so far
    const usageResult = await db.query(
      'SELECT COALESCE(SUM(api_calls),0) AS total_calls, COALESCE(SUM(tokens),0) AS total_tokens FROM usage_events WHERE tenant_id = $1',
      [tenantId]
    );
    const usage = usageResult.rows[0];

    // Quota enforcement BEFORE insert
    if (usage.total_calls + apiCalls > tenant.quota_api_calls) {
      return res.status(429).json({ error: 'API quota exceeded' });
    }
    if (usage.total_tokens + tokens > tenant.quota_tokens) {
      return res.status(402).json({ error: 'Token quota exceeded, upgrade required' });
    }

    // Idempotency check
    const existing = await db.query('SELECT * FROM usage_events WHERE event_key = $1', [eventKey]);
    if (existing.rows.length > 0) {
      return res.json({ message: 'Already processed' });
    }

    // Record usage
    await db.query(
      'INSERT INTO usage_events (tenant_id, event_key, api_calls, tokens) VALUES ($1, $2, $3, $4)',
      [tenantId, eventKey, apiCalls, tokens]
    );

    res.json({ usage: { total_calls: usage.total_calls + apiCalls, total_tokens: usage.total_tokens + tokens } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
