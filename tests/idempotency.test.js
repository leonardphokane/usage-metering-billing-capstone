jest.mock('stripe');

const request = require('supertest');
const app = require('index.js');   // ✅ now resolves via <rootDir>/src


describe('Idempotency', () => {
  it('should not double-count usage events with same idempotency key', async () => {
    const key = 'test-key-123';

    const first = await request(app)
      .post('/usage')
      .set('Idempotency-Key', key)
      .send({ tenantId: 'A', tokens: 2500 });

    const second = await request(app)
      .post('/usage')
      .set('Idempotency-Key', key)
      .send({ tenantId: 'A', tokens: 2500 });

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(second.body.eventId).toBe(first.body.eventId); // ✅ same event
  });
});
