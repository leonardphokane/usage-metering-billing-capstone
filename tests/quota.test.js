
jest.mock('stripe');
const request = require('supertest');
const app = require('index.js');   // ✅ now resolves via <rootDir>/src


// Mock Stripe to avoid crashing when app loads


describe('Quota Enforcement', () => {
  it('should reject when API calls exceed quota', async () => {
    const res = await request(app)
      .post('/usage')
      .send({ tenantId: 'FreeTenant', eventKey: 'quota-api', apiCalls: 2000, tokens: 0 }); // exceeds 1000

    expect(res.status).toBe(429); // Too Many Requests
    expect(res.body.error || res.body.message).toMatch(/quota exceeded/i);
  });

  it('should reject when tokens exceed quota', async () => {
    const res = await request(app)
      .post('/usage')
      .send({ tenantId: 'FreeTenant', eventKey: 'quota-tokens', apiCalls: 0, tokens: 200000 }); // exceeds 100k

    expect(res.status).toBe(402); // Payment Required
    expect(res.body.error || res.body.message).toMatch(/upgrade/i);
  });
});
