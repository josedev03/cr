const express = require('express');
const router = express.Router();
const Controller = require('./index');

router.post('/getToken', getToken);

// internal functions

async function getToken(req, res, next) {
  try {
    const token = await Controller.getToken(req);
    res.status(200).json({
      data: token.data
    });
    return;
  } catch (error) {
    console.log(`[ERROR] getToken: ${error.message}`);
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = router;
