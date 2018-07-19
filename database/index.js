require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT;// || 3000;
// const mongoUrl = `mongodb://localhost/${PORT}`; //check, could be possible error
//const mongoUrl = `mongodb://db:helloworld@localhost/${PORT}`
//const mongoUrl = `mongodb://dbGoodFlix:helloworld1@ds133601.mlab.com:33601/heroku_pn2wqhdh`
// console.log(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`);
// const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;

if ( process.env.NODE_ENV === 'production' ) {
  const mongoUrl = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`;
} else {
  const mongoUrl = `mongodb://${process.env.DB_SERVER}`;
}

mongoose.connect(mongoUrl, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));

db.once('open', function() {
  console.log('mongo connected')
})

module.exports = db;
