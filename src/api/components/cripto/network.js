const express = require('express');
const router = express.Router();
const Controller = require('./index');
const commonHeaders = ['session_id', 'timestamp', 'application', 'channel_id', 'terminal_id'];

router.use('/', middlewareHeaders);
router.get('/generate', generateKey);
router.post('/encrypt', encrypt);
router.post('/decrypt', decrypt);

// internal functions

function middlewareHeaders(req, res, next) {
  const failHeaders = [];
  commonHeaders.map((el) => {
    let tempHeader = req.header(`${el}`);
    if (!tempHeader) {
      failHeaders.push(el);
    }
  });

  if (failHeaders.length > 0) {
    res.status(402).send({
      message: 'faltan headers en la petición'
    });
    return;
  }
  next();
}

function generateKey(req, res, next) {
  Controller.generateKey()
    .then((lista) => {
      res.json(lista);
    })
    .catch(next);
}

function encrypt(req, res, next) {
  Controller.encrypt(req.body.message)
    .then((lista) => {
      res.json(lista);
    })
    .catch(next);
}

function decrypt(req, res, next) {
  Controller.decrypt(req.body.message)
    .then((lista) => {
      res.json(lista);
    })
    .catch(next);
}

module.exports = router;
