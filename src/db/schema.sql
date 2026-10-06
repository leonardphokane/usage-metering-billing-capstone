CREATE TABLE tenants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'free',
  quota_api_calls INT DEFAULT 1000,
  quota_tokens INT DEFAULT 100000
);

CREATE TABLE usage_events (
  id SERIAL PRIMARY KEY,
  tenant_id INT REFERENCES tenants(id),
  event_key TEXT UNIQUE,
  api_calls INT DEFAULT 0,
  tokens INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
