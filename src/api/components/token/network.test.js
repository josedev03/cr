const network = require('./network');
const Controller = require('./controller');
const request = require('supertest');
const express = require('express');
const app = express();

const controllerFn = Controller();
const resolves = {
  GENERATEKEY: {
    OK: jest.fn(() =>
      Promise.resolve({
        data: 'mock tokenGeneradokaksajksajsajsajkajskjaksjk'
      })
    ),
    CATCH: jest.fn(() => Promise.reject(new Error('Error Mock')))
  }
};

app.use(express.urlencoded({ extended: true }));
app.use('/api/token', network);

describe('Routes Encrypt', () => {
  test('Route Encrypt', (done) => {
    try {
      const body = {
        user: '18d93cffe974abe28200aff6f64eb572.eda59ee98d48b0b2758a309842e2e5bc',
        password: '3c6dc604112aa178a22fef92b2b39d2f.f85b91042c7b848bb6fa4963e114d515',
        client_id: 'isClientId',
        secret_id: 'isSecretId'
      };

      controllerFn.getToken = resolves.GENERATEKEY.OK;

      request(app)
        .post('/api/token/getToken')
        .set('session_id', 'session_id')
        .set('timestamp', 'timestamp')
        .set('application', 'application')
        .set('channel_id', 'channel_id')
        .set('terminal_id', 'terminal_id')
        .set('Content-Type', 'application/json')
        .send(body)
        .expect(200, done);
    } catch (error) {
      console.log('hubo error');
    }
  });

  test('Route Encrypt Catch', (done) => {
    try {
      controllerFn.getToken = resolves.GENERATEKEY.CATCH;

      request(app)
        .post('/api/token/getToken')
        .set('session_id', 'session_id')
        .set('timestamp', 'timestamp')
        .set('application', 'application')
        .set('channel_id', 'channel_id')
        .set('terminal_id', 'terminal_id')
        .set('Content-Type', 'application/json')
        .expect(500, done);
    } catch (error) {
      console.log('hubo error');
    }
  });
});
