// tests/usage.test.js
const request = require('supertest');
const app = require('../src/index.js');  // ✅ import the app

describe('Usage API', () => {
  it('should reject when quota exceeded', async () => {
    const res = await request(app)
      .post('/usage')
      .send({ tenantId: 'FreeTenant', eventKey: 'usage-test', apiCalls: 2000, tokens: 0 });

    expect(res.status).toBe(429);
  });
});
