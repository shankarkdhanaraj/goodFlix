const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

const MovieSchema = new mongoose.Schema({
  //"_id" will be automatically created//
  title: String
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;