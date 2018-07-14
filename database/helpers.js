const mongoose = require('mongoose');
const db = require('./index.js');
const Movie = require('./Movie.js');
const User = require('./User.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

let addUser = function(userName, password) {
  isUserinDb(userName, password, function(results) {
    //if user doesn't exist
    if (results.length == 0) {
      let user = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: userName,
        password: password
      });
      user.save(function(err) {
        if (err) return handleError(err);
      })
      return 0;
    // if user already exists
    } else {
      return 1;
    }
  })
}

let handleLogin = function(userName, password) {
  isUserinDb(userName, password, function(results) {
    console.log(results)
    //if user doesn't exist
    if (results.length == 0) {
      console.log(1)
      return 1;
    } else {
      //if username and password match
      if (results[0].password === password) {
        console.log(0)
        return 0;
        //if username and password don't match
      } else {
        console.log(2)
        return 2;
      }
    }
  })
}

let isUserinDb = (userName, password, cb) => {
  User.find({userName: userName}, function(err, result) {
    if (err) {return 11};
    cb(result);
  })
}

module.exports = {
  addUser: addUser,
  handleLogin: handleLogin
}
