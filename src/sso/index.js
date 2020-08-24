const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/token', (req, res, next) => {
  const granType = req.body.grant_type;
  res.status(200).json({
    token: 'tokenGeneradokaksajksajsajsajkajskjaksjk'
  });
  return;
});

app.listen(3002, () => {
  console.log(`runing on port 30002`);
});
