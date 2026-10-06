jest.mock('stripe'); // ✅ ensures Stripe is mocked before app loads


const request = require('supertest');

const app = require('index.js');   // ✅ now resolves via <rootDir>/src




describe('Stripe Integration', () => {
  it('should upgrade tenant from Free → Pro via webhook', async () => {
    const fakeEvent = {
      type: 'checkout.session.completed',
      data: { object: { tenantId: 'A', plan: 'Pro' } },
    };

    const res = await request(app)
      .post('/webhook')
      .send(fakeEvent);

    expect(res.status).toBe(200);
    expect(res.body.updatedPlan).toBe('Pro'); // ✅ plan flipped
  });
});
