const mongoose = require('mongoose');
const db = require('./index.js');
const Movie = require('./Movie.js');
const User = require('./User.js');
const request = require('request');
const config = require('../config.js');
mongoose.Promise = global.Promise;  //not sure if we need this??

let addUser = function(userName, password, cb) {
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
      cb(0);
    // if user already exists
    } else {
      cb(1);
    }
  })
}

let handleLogin = function(userName, password, cb) {
  isUserinDb(userName, password, function(results) {
    console.log(results)
    //if user doesn't exist
    if (results.length == 0) {
      cb(1);
    } else {
      //if username and password match
      if (results[0].password === password) {
        cb(0);
        //if username and password don't match
      } else {
        cb(2);
      }
    }
  })
}

let isUserinDb = (userName, password, cb) => {
  User.find({userName: userName}, function(err, result) {
    if (err) {cb(11)};
    cb(result);
  })
}

let isMovieinDb = (title, cb) => {
  Movie.find({title: title}, function(err, result) {
    if (err) {return err};
    cb(result);
  })
}

let getUser = (userName, cb) => {
  User.find({userName: userName}, function(err, result) {
    if (err) {console.log(err)}
    cb(result[0]);
  })
}

let getMovieInfoAPI = (title, callback) => {
  let options = {
    url: `https://ee.iva-api.com/api/Entertainment/Match/?ProgramType=Movie&Title=${title}&subscription-Key=${config.API_KEY}`,
    json:true,
    headers: {
     'User-Agent': 'request',
     "Content-Type": "application/json",
     'Ocp-Apim-Subscription-Key':`${config.API_KEY}`,
     "Access-Control-Allow-Origin": true
    }
  }

  request(options, function(err, response, body){
    if(err){
      console.log('error in request module');
      callback(err,null)
    } else{
      console.log('IVA Request SUCCESS');
      //return the only or closest matched movie
      saveMovie(response.body.ProgramMatches[0]);
      callback(response.body.ProgramMatches[0]);
    }
  })
}

let saveMovie = (movie) => {
  isMovieinDb({title: movie.Title}, function(err, result) {
    //if movie already in database do nothing;
    if (result.length == 1) {
      console.log(result)
      return;
      //add movie to database
    } else {
      let movie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: movie.Title,
        originalReleaseDate: movie.OriginalReleaseDate,
        year: movie.Year,
        contributors: movie.Contributors,
        descriptions: movie.Descriptions,
        images: movie.Images,
        ivaRating: movie.IvaRating
      })
      movie.save(function(err) {
        if (err) return handleError(err);
        console.log(movie.Title, 'saved')
      })
    }
  })
}

module.exports = {
  addUser: addUser,
  handleLogin: handleLogin,
  getUser: getUser,
  getMovieInfoAPI: getMovieInfoAPI,
  saveMovie: saveMovie
}
