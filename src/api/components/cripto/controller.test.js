const Controller = require('./controller');
const tempCrypto = require('../../../vault/CV_JS');

const resolves = {
  ENCRYPT: {
    OK: jest.fn(() => Promise.resolve('DatoMock Encrypt')),
    CATCH: jest.fn(() => Promise.reject(new Error('Error Mock')))
  },
  DECRYPT: {
    OK: jest.fn(() => Promise.resolve('DatoMock Decrypt')),
    CATCH: jest.fn(() => Promise.reject(new Error('Error Mock')))
  },
  GENERATEKEY: {
    OK: jest.fn(() => Promise.resolve('ytwqytwqytwytwqkkjskAJSKj'))
  },
  REFRESHKEY: {
    OK: jest.fn(() => Promise.resolve('ytwqytwqytwytwqkkjskAJSKjrefresh'))
  }
};

describe('Controller Encrypt', () => {
  const controller = Controller();
  test('Method Encrypt', async () => {
    tempCrypto.encrypt = resolves.ENCRYPT.OK;
    const data = await controller.encrypt('{"username": "1234"}');
    expect(data).toMatchObject({ data: 'DatoMock Encrypt' });
  });

  test('Method Encrypt CATCH', async () => {
    tempCrypto.encrypt = resolves.ENCRYPT.CATCH;
    const data = await controller.encrypt('{"username": "1234"}');
    expect(data).toMatchObject({ error: 'Error Mock' });
  });

  test('Method Decrypt', async () => {
    tempCrypto.decrypt = resolves.DECRYPT.OK;
    const data = await controller.decrypt('{"username": "1234"}');
    expect(data).toMatchObject({ data: 'DatoMock Decrypt' });
  });

  test('Method Decrypt Catch', async () => {
    tempCrypto.decrypt = resolves.DECRYPT.CATCH;
    const data = await controller.decrypt('{"username": "1234"}');
    expect(data).toMatchObject({ error: 'Error Mock' });
  });

  test('Method generateKey', async () => {
    tempCrypto.keyExchange = resolves.GENERATEKEY.OK;
    const data = await controller.generateKey('uqwyqwuywqwuywuywuq');
    expect(data).toMatchObject({ data: 'ytwqytwqytwytwqkkjskAJSKj' });
  });

  test('Method generateKey', async () => {
    tempCrypto.refreshKey = resolves.REFRESHKEY.OK;
    const data = await controller.refreshKey('uqwyqwuywqwuywuywuq');
    expect(data).toMatchObject({ data: 'ytwqytwqytwytwqkkjskAJSKjrefresh' });
  });
});
