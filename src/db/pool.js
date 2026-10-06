module.exports = {
  query: jest.fn((sql, params) => {
    if (sql.includes('SELECT * FROM tenants')) {
      return Promise.resolve({ rows: [{ id: params[0], quota_api_calls: 1000, quota_tokens: 100000 }] });
    }
    if (sql.includes('SUM(api_calls)')) {
      return Promise.resolve({ rows: [{ total_calls: 0, total_tokens: 0 }] });
    }
    return Promise.resolve({ rows: [] });
  })
};
