const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

const MovieSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  rating: {type: Number, default: null},
  originalReleaseDate: Number,
  year: Number,
  contributors: Array,
  descriptions: Array,
  images: Array,
  ivaRating: String
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;