var express = require('express');
var app = express();

app.use(express.static('client/dist'));

app.listen(3000, (err, response) => {
  if (!err) {
    console.log('listening on port 3000');
  }
});