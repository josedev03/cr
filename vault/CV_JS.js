const axios = require('axios').default;
const crypto = require('crypto');
const keyGlobal = crypto.randomBytes(24);
CV_JS = {
  host: '127.0.0.1',
  port: '3000',
  refreshTime: 30000,
  k1: new Uint8Array([126, 171, 34, 253, 158, 140, 180, 130, 162, 226, 8, 185, 203, 97, 56, 7]),
  iv: new Uint8Array([48, 143, 242, 226, 102, 250, 64, 164, 54, 235, 209, 115])
};

// t = setInterval(function () {
//   CV_JS.refreshKey(CV_JS.host, CV_JS.port);
// }, CV_JS.refreshTime);

function clearT() {
  clearInterval(t);
}

var enc = new TextEncoder('utf-8');
var dec = new TextDecoder('utf-8');
var tmpVar = 0;

CV_JS.keyExchange = function (a, b) {
  console.log('Connecting to server' + a + ':' + b);
  var data = { clientNumber: 'Client Public Key' };
  console.log('Client sends ' + JSON.stringify(data));
  axios
    .post('http://127.0.0.1:3000/keyExchange', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      return response;
    });
};

CV_JS.refreshKey = function (a, b) {
  console.log('Refreshing keys with ' + a + ':' + b);
  var data = { clientNumber: 'Client Public Key' };
  console.log('Client sends ' + JSON.stringify(data));

  axios
    .post('http://127.0.0.1:3000/keyExchange', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function (response) {
      console.log(response);
      return response;
    });
};

CV_JS.encrypt = async function (a) {
  const initializationVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-192-cbc', keyGlobal, initializationVector);
  let encrypted = cipher.update(a, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted + '.' + initializationVector.toString('hex');
};

CV_JS.decrypt = async function (a) {
  try {
    const [msg, base64iv] = a.split('.');
    const iv = Buffer.from(base64iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-192-cbc', keyGlobal, iv);
    let decrypted = decipher.update(msg, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    throw Error(e.message);
  }
};

module.exports = CV_JS;
