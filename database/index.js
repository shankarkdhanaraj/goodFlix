const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
//const mongoUrl = `mongodb://localhost/${PORT}`; //check, could be possible error
const mongoUrl = `mongodb://db:helloworld@localhost/${PORT}`
mongoose.connect(mongoUrl, { useMongoClient: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() { 
  console.log('mongo connected')
})

module.exports = db;