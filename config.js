module.exports = {
  api: {
    port: process.env.API_PORT || 3000
  },
  mock: {
    ssoUrl: process.env.MOCK_SSO_URL || 'http://localhost:3002/token'
  }
};
