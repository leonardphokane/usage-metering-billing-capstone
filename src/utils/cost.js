// src/utils/cost.js
const pricing = require('../config/pricing');

function calculateCost(usage) {
  const apiCallsCost = (usage.apiCalls || 0) * pricing.API_CALL_PRICE;
  const tokensCost = (usage.tokens || 0) * pricing.TOKEN_PRICE;
  return {
    apiCalls: apiCallsCost,
    tokens: tokensCost,
    total: apiCallsCost + tokensCost
  };
}

module.exports = { calculateCost };