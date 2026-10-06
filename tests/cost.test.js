jest.mock('stripe');
const app = require('index.js');   // ✅ now resolves via <rootDir>/src


const { calculateCost } = require('../src/utils/cost');

describe('Cost Rollup', () => {
  it('should match pinned pricing constants', () => {
    const usage = { apiCalls: 1000, tokens: 100000 };
    const cost = calculateCost(usage);

    expect(cost.apiCalls).toBe(1000 * 0.001); // $0.001 per call
    expect(cost.tokens).toBe(100000 * 0.00001); // $0.00001 per token
    expect(cost.total).toBeCloseTo(cost.apiCalls + cost.tokens);
  });
});
