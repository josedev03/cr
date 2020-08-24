const express = require('express');

const config = require('../../config.js');
const cripto = require('./components/cripto/network');
const token = require('./components/token/network');
// const errores = require('../network/errors');

const app = express();

app.use(express.json());
app.use('/api/crypto', cripto);
app.use('/api/token', token);

// manejo de errores
// app.use(errores);

app.listen(config.api.port, () => {
  console.log(`runing on port ${config.api.port}`);
});
