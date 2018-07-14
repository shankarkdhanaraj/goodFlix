const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

const MovieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  rating: {type: Number, default: null}
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;