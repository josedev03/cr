const encryptVault = require('../../../vault/vault');
const tempCrypto = require('../../../vault/CV_JS');

module.exports = function () {
  async function generateKey() {
    const data = await tempCrypto.keyExchange('1020202', 'dato1');
    return {
      data: data
    };
  }

  async function refreshKey() {
    const data = await tempCrypto.refreshKey('1020202', 'dato2');
    return {
      data: data
    };
  }

  async function encrypt(message) {
    try {
      if (Array.isArray(message)) {
        const arrayResponse = await Promise.all(
          message.map(async (element) => {
            return await tempCrypto.encrypt(element);
          })
        );

        return {
          data: arrayResponse
        };
      } else if (typeof message === 'string') {
        const messageEncripted = await tempCrypto.encrypt(message);

        return {
          data: messageEncripted
        };
      } else {
        return {
          error: 'Tipo de dato no permitido'
        };
      }
    } catch (error) {
      return {
        error: error.message
      };
    }
  }

  async function decrypt(message) {
    try {
      if (Array.isArray(message)) {
        const arrayResponse = await Promise.all(
          message.map(async (element) => {
            return await tempCrypto.decrypt(element);
          })
        );

        return {
          data: arrayResponse
        };
      } else if (typeof message === 'string') {
        const messageEncripted = await tempCrypto.decrypt(message);

        return {
          data: messageEncripted
        };
      } else {
        return {
          error: 'Tipo de dato no permitido'
        };
      }
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
