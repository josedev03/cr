const tempCrypto = require('../../../vault/CV_JS');
const Controller = require('./controller');
const axios = require('axios');

jest.mock('axios');

const controllerFn = Controller();

const resolves = {
  DECRYPT: {
    OK: jest.fn(() => Promise.resolve('DatoMock Decrypt')),
    CATCH: jest.fn(() => Promise.reject(new Error('Error Mock')))
  }
};

describe('Controller Token', () => {
  test('Get Token Ok', async () => {
    const resp = {
      data: {
        token: 'response axios mock'
      }
    };

    const requesxx = {
      body: {
        username: '18d93cffe974abe28200aff6f64eb572.eda59ee98d48b0b2758a309842e2e5bc',
        password: '3c6dc604112aa178a22fef92b2b39d2f.f85b91042c7b848bb6fa4963e114d515',
        client_id: 'isClientId',
        secret_id: 'isSecretId'
      }
    };

    tempCrypto.decrypt = resolves.DECRYPT.OK;
    axios.post.mockResolvedValue(resp);
    const data = await controllerFn.getToken(requesxx);
    expect(data).toMatchObject({ data: 'response axios mock' });
  });

  test('Get Token Catch', async () => {
    const data = await controllerFn.getToken();
    expect(data).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});
