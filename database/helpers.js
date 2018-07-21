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

let selectAll = function(callback) {
  Movie.find({}, function(err, items) {
    if(err) {
      console.log('error in selectAll db',err)
      callback(err, null);
    } else {
      console.log('success in selectAll db',items)
      callback(null, items);
    }
  })
};

let handleLogin = function(userName, password, cb) {
  isUserinDb(userName, password, function(results) {
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

let getDbMovieInfo = (title, cb) => {
  Movie.find({title: title}, function(err, result) {
    if (err) {console.log(err)};
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
      callback(response.body.ProgramMatches[0]);
    }
  })
}

let saveMovie = (movie, cb) => {
  getDbMovieInfo(movie.Title, (result) => {
    //if movie already in database do nothing;
    console.log('length', result.length)
    if (result.length == 1) {
      console.log( movie.Title, 'already saved');
      cb(movie.Title)
      //add movie to database
    } else {
      let newMovie = new Movie({
        _id: new mongoose.Types.ObjectId(),
        title: movie.Title,
        //rating: movie.Releases[0].Certification,
        originalReleaseDate: movie.OriginalReleaseDate,
        year: movie.Year,
        contributors: movie.Contributors,
        descriptions: movie.Descriptions,
        images: movie.Images,
        ivaRating: movie.IvaRating
      })
      newMovie.save(function(err) {
        if (err) {console.log('error in saving in db',err)};
        console.log(movie.Title, 'saved');
        cb(movie.Title)
      })
    }
  })
}


let getMovieId = (title, cb) => {
  getDbMovieInfo(title, (result) => {
    console.log(result)
    cb(result[0]._id);
  })
}

let getUsers = (cb) => {
  User.find({}, function(err, results) {
    if (err) {console.log(err)}
    cb(results)
  })
}

let getWatchlist = (userName, cb) => {
  getUser(userName, (result) => {
    cb(result.watchList)
  })
}

let getWatchedlist = (userName, cb) => {
  getUser(userName, (result) => {
    cb(result.recentlyWatched)
  })
}

let getFavorites = (userName, cb) => {
  getUser(userName, (result) => {
    cb(result.favorites)
  })
}

let getFollowing = (userName, cb) => {
  getUser(userName, (result) => {
    cb(result.following)
  })
}

let getMovieTitleFromId = (id, cb) => {

    Movie.find({_id: id}, function(err, movie) {
      if (err) {console.log(err)}
      cb(movie[0].title)
    })
}

let addWatchlist = (userName, title, cb) => {
  getWatchlist(userName, (oldWatchList) => {
    getMovieId(title, (id) => {
      let list = oldWatchList;
      list.push(id);
      User.findOneAndUpdate({userName: userName}, {watchList: list}, function(err, response) {
        if (err) {console.log(err)}
        getWatchlist(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let deleteWatchlist = (userName, title, cb) => {
  getWatchlist(userName, (oldWatchList) => {
    getMovieId(title, (id) => {
      let list = oldWatchList;
      let index = list.indexOf(id);
      if (index > -1) {
        list.splice(index, 1);
      }
      User.findOneAndUpdate({userName: userName}, {watchList: list}, function(err, response) {
        if (err) {console.log(err)}
        getWatchlist(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let addWatchedlist = (userName, title, cb) => {
  getWatchedlist(userName, (oldWatchedList) => {
    getMovieId(title, (id) => {
      let list = oldWatchedList;
      list.push(id);
      User.findOneAndUpdate({userName: userName}, {recentlyWatched: list}, function(err, response) {
        if (err) {console.log(err)}
        getWatchedlist(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let deleteWatchedlist = (userName, title, cb) => {
  getWatchedlist(userName, (oldWatchedList) => {
    getMovieId(title, (id) => {
      let list = oldWatchList;
      let index = list.indexOf(id);
      if (index > -1) {
        list.splice(index, 1);
      }
      User.findOneAndUpdate({userName: userName}, {recentlyWatched: list}, function(err, response) {
        if (err) {console.log(err)}
        getWatchedlist(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let addFavorite = (userName, title, cb) => {
  getFavorites(userName, (oldFavoritesList) => {
    getMovieId(title, (id) => {
      let list = oldFavoritesList;
      list.push(id);
      User.findOneAndUpdate({userName: userName}, {favorites: list}, function(err, response) {
        if (err) {console.log(err)}
        getFavorites(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let deleteFavorite = (userName, title, cb) => {
  getFavorites(userName, (oldFavoritesList) => {
    getMovieId(title, (id) => {
      let list = oldFavoritesList;
      let index = list.indexOf(id);
      if (index > -1) {
        list.splice(index, 1);
      }
      User.findOneAndUpdate({userName: userName}, {favorites: list}, function(err, response) {
        if (err) {console.log(err)}
        getFavorites(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let addFollowing = (userName, title, cb) => {
  getFollowing(userName, (oldFollowingList) => {
    getMovieId(title, (id) => {
      let list = oldFollowingList;
      list.push(id);
      User.findOneAndUpdate({userName: userName}, {following: list}, function(err, response) {
        if (err) {console.log(err)}
        getFollowing(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let deleteFollowing = (userName, title, cb) => {
  getFollowing(userName, (oldFollowingList) => {
    getMovieId(title, (id) => {
      let list = oldFollowingList;
      let index = list.indexOf(id);
      if (index > -1) {
        list.splice(index, 1);
      }
      User.findOneAndUpdate({userName: userName}, {following: list}, function(err, response) {
        if (err) {console.log(err)}
        getFollowing(userName, (newList) => {
          cb(newList)
        })
      })
    })
  })
}

let getMovies = (cb) => {
  Movie.find({}, function(err, results) {
    if (err) { console.log(err) }
    cb(results)
 })
}

const getImagesByPath = (path,callback) => {

    let options = {
    url: `https://ee.iva-api.com/api/Images/${path}/Redirect?subscription-Key=${config.API_KEY}`,
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
    console.log('error in request2 module',err);
    callback(err,null)
  }else{
    console.log('IVA2 Request SUCCESS',response.body);
    callback(null,response);
    // var results = body.matches;
    // callback(null,results);
  }
})

}


module.exports = {
  addUser: addUser,
  selectAll:selectAll,
  handleLogin: handleLogin,
  getUser: getUser,
  getDbMovieInfo: getDbMovieInfo,
  getMovieInfoAPI: getMovieInfoAPI,
  saveMovie: saveMovie,
  getMovieId: getMovieId,
  getUsers: getUsers,
  addWatchlist: addWatchlist,
  getMovies: getMovies,
  getImagesByPath:getImagesByPath,
  getMovieTitleFromId: getMovieTitleFromId,
  deleteWatchlist: deleteWatchlist,
  getWatchlist: getWatchlist,
  getWatchedlist: getWatchedlist,
  addWatchedlist: addWatchedlist,
  deleteWatchedlist: deleteWatchedlist,
  addFavorite: addFavorite,
  deleteFavorite: deleteFavorite,
  getFavorites: getFavorites,
  addFollowing: addFollowing,
  deleteFollowing: deleteFollowing,
  getFollowing: getFollowing

}
