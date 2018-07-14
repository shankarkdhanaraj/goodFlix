var express = require('express');
const PORT = process.env.PORT || 3000;
var dbHelpers = require('../database/helpers.js');
var app = express();

app.use(express.static('client/dist'));

//dbHelpers.addUser(userName, password)
//dbHelpers.handleLogin(userName, password)

app.listen(PORT, (err, response) => {
  if (!err) {
    console.log(`listening on port ${PORT}`);
  }
});


