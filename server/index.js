var express = require('express');
const PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static('client/dist'));

app.listen(PORT, (err, response) => {
  if (!err) {
    console.log(`listening on port ${PORT}`);
  }
});