const tempCrypto = require('../../../vault/CV_JS');
const axios = require('axios');
const config = require('../../../../config');
const qs = require('querystring');

module.exports = function () {
  async function getToken(req) {
    try {
      const clientId = req.body.client_id;
      const secretId = req.body.secret_id;
      const username = await tempCrypto.decrypt(req.body.username);
      const password = await tempCrypto.decrypt(req.body.password);
      const url = config.mock.ssoUrl;
      const axiosConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };

      const requestBody = {
        grant_type: 'password',
        client_id: clientId,
        client_secret: secretId,
        username: username,
        password: password
      };

      const response = await axios.post(url, qs.stringify(requestBody), axiosConfig);

      return {
        data: response.data.token
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  return {
    getToken
  };
};
