async function encrypt(message) {
  await delay();
  const temp = message.toString();
  const buff = new Buffer(temp);
  const encriptData = buff.toString('base64');
  return encriptData;
}

async function decrypt(message) {
  await delay();
  const temp = message.toString();
  const buff = new Buffer(temp, 'base64');
  const decryptData = buff.toString('ascii');
  return decryptData;
}

async function refreshKey(key, message) {
  console.log(key, message);
  await delay();
  return true;
}

async function generateKey(key, message) {
  console.log(key, message);
  await delay();
  return true;
}

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('3 seconds');
    }, 1500);
  });
}

module.exports = {
  encrypt,
  decrypt,
  refreshKey,
  generateKey
};
