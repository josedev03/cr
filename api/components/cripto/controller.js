const encryptVault = require('../../../vault/vault');
const tempCrypto = require('../../../vault/CV_JS');

module.exports = function () {
  async function generateKey() {
    const data = await encryptVault.generateKey('1020202', 'dato1');
    return {
      data: data
    };
  }

  async function refreshKey() {
    const data = await encryptVault.refreshKey('1020202', 'dato2');
    return {
      data: data
    };
  }

  async function encrypt(message) {
    try {
      const messageEncripted = await tempCrypto.encrypt(message);

      return {
        data: messageEncripted
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  async function decrypt(message) {
    try {
      const messageEncripted = await tempCrypto.decrypt(message);

      return {
        data: messageEncripted
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  return {
    generateKey,
    refreshKey,
    encrypt,
    decrypt
  };
};
