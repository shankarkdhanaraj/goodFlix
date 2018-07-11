const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

const UserSchema = new mongoose.Schema({
  //"_id" will be automatically created//
  userName: String,
  password: String,
  watchList: [type: Schema.Types.ObjectId, ref: 'Movie'],
  recentlyWatched: [type: Schema.Type.ObjectId, ref: 'Movie'],
  favorites: [type: Schema.Types.ObjectId, ref: 'Movie'],
  following: [type: Schema.Types.ObjectId, ref: 'User']
});

const User = mongoose.model('User', UserSchema);

var user = new User({userName: 'helloworld'});
console.log(user.userName);

module.exports = User;