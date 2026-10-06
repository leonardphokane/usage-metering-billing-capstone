// __mocks__/stripe.js
module.exports = function () {
  return {
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'fake_session' })
      }
    }
  };
};
