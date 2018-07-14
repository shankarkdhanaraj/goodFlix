const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('./index.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

const UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userName: String,
  password: String,
  watchList: [{type: Schema.Types.ObjectId, ref: 'Movie', default: null}],
  recentlyWatched: [{type: Schema.Types.ObjectId, ref: 'Movie', default: null}],
  favorites: [{type: Schema.Types.ObjectId, ref: 'Movie', default: null}],
  following: [{type: Schema.Types.ObjectId, ref: 'User', default: null}]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;