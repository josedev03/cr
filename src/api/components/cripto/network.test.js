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
        data: 'mock controller'
      })
    )
  }
};

app.use(express.urlencoded({ extended: true }));
app.use('/api/crypto', network);

describe('Routes Encrypt', () => {
  test('Route Encrypt', (done) => {
    request(app)
      .post('/api/crypto/encrypt')
      .set('session_id', 'session_id')
      .set('timestamp', 'timestamp')
      .set('application', 'application')
      .set('channel_id', 'channel_id')
      .set('terminal_id', 'terminal_id')
      .set('Content-Type', 'application/json')
      .send({
        message: "{'username':'usernameSecret','password':'passwordSecret'}"
      })
      .expect(200, done);
  });

  test('Route Encrypt whitout headers', (done) => {
    request(app)
      .post('/api/crypto/encrypt')
      .set('Content-Type', 'application/json')
      .send({
        message: "{'username':'usernameSecret','password':'passwordSecret'}"
      })
      .expect(402, done);
  });

  test('Route Decrypt', (done) => {
    request(app)
      .post('/api/crypto/decrypt')
      .set('session_id', 'session_id')
      .set('timestamp', 'timestamp')
      .set('application', 'application')
      .set('channel_id', 'channel_id')
      .set('terminal_id', 'terminal_id')
      .set('Content-Type', 'application/json')
      .send({
        message: "{'username':'usernameSecret','password':'passwordSecret'}.27637263726237"
      })
      .expect(200, done);
  });

  test('Route GenerateKey', (done) => {
    controllerFn.generateKey = resolves.GENERATEKEY.OK;

    request(app)
      .get('/api/crypto/generate')
      .set('session_id', 'session_id')
      .set('timestamp', 'timestamp')
      .set('application', 'application')
      .set('channel_id', 'channel_id')
      .set('terminal_id', 'terminal_id')
      .set('Content-Type', 'application/json')
      .expect(200, done);
  });
});
