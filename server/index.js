var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT;// || 3000;
var dbHelpers = require('../database/helpers.js');
var apihelper = require('../api/api.js')
var app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: false,
    secure: false,
    maxAge: null
  }
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client/dist'));

var currentSession;

// GET landing page
app.get('/logout', function(req, res) {
  // console.log('Logging out/Destroying session...');
  // console.log(`comparing sessions. Browser- ${req.session.id} |  Server- ${currentSession.id}`);
  req.session.destroy( (err) => {
    if ( err ) {
      console.log('Error destroying session...', err.message);
    } else {
      res.send('logged out');
    }
  });
});


//'sign in' button --> GET request to '/user/home' --> mongo query to retrieve that particular user from users table
// input : username,password
app.get('/user/home', function(req, res) {

  let username = req.query.username;
  let password = req.query.password;
  // let logResult = dbHelpers.handleLogin(username, password);
  // console.log('Origina URL for GET uer/home. ', req.originalUrl);
  // console.log('Request query for GET uer/home. ', req.query);
  // console.log(`received GET user/home request. user and passowrd:- `, username + '  ' + password);
  dbHelpers.handleLogin(username, password, (logResult) => {
    if ( logResult === 0 ) {
      req.session.regenerate(function(err) {
        req.session.user = username;
        req.session.save();
        currentSession = req.session;
        // console.log('session is...', currentSession);
        // console.log('req cookies is...', req.cookies);
        // console.log('req session cookies is...', req.session.cookie);
        res.send(`0`); //user logged in successfully
      });
    } else if ( logResult === 1 ) {
      res.send(`1`); //user doesn't exist
    } else if ( logResult === 2 ) {
      res.send(`2`); //password doesn't match
    } else {
      res.send(`unknown error logging in user ${username}`);
    }
  });
  //use dbHelpers.getUser(userName, cb) cb returns obect {watchlist: array, recentlyWatched: array, favorites: array, following: array, userName: string

});

//clicking on search button --> should send a POST request to '/movies' --> mongo query to retrieve (10) movies from API input : search query
// API : https://ee.iva-api.com/api/Entertainment/Search/?ProgramTypes=Movie&Title=fight&subscription-Key=8e97e89696b241678e66bdd004c7abd3
//Output : Title, Year , Original Language , Runtime , Iva Rating , Official Site Url
app.post('/movies', function(req, res) {


	var moviename = req.body.search;

	apihelper.getMoviesByName(moviename ,function(err,result){
		if(err){
			console.log('error in post / movies');
			res.send(err);
		}else{
			console.log('res in post / movies');
			res.send(result);
		}
	})
});

app.get('/movie',function(req,res){
  console.log('inside get / movie');
  dbHelpers.selectAll(function(err,result){
    if(err){
      console.log('error in get / movie',err);
    }else{
      console.log('result inside get / movie');
      res.send(result);
    }
  })
})


//clicking on movie name in homepage --> GET request to '/movie'  --> mongo query to retrieve details about that particular movie from API
//input : movie name
// API : https://ee.iva-api.com/api/Entertainment/Match/?ProgramType=Movie&Title=titanic&subscription-Key=8e97e89696b241678e66bdd004c7abd3
// Output : Title , Original Release Date , Year , Original Language , Contributers OBJECT(Person Id , Person Name, Character, Job ) , Descriptions OBJECT ( Description ) , Images OBJECT (File Path), Iva Rating


app.post('/movie', function(req, res) {
  let title = req.body.title;
  console.log('movie title inside POST',title);
  dbHelpers.getMovieInfoAPI(title, (result) => {
  	//if movie already in database
  	if (result.length == 1) {
  	  //get movie and send
      res.send(result);
    //if movie not in DB..
  	} else {
  	  //get movie info from API...
  	  dbHelpers.getMovieInfoAPI(title, (movie) => {
  	  	//save to DB
        dbHelpers.saveMovie(movie, (flick) => {
          //get info from database
          dbHelpers.getDbMovieInfo(flick, (film) => {
            // console.log('film',film);
          res.send(film);
          })
        })
  	  })
  	}
  })

});

app.get('/movie/title', function(req, res) {
  let id = req.query.id;
  dbHelpers.getMovieTitleFromId(id, (title) => {
    res.send(title)
  })
})



// clicking on register button --> POST request to '/users' --> mongo query to create a new watcher in db
// input : username, password
// action : add new user to watchers table
app.post('/users', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  // let sigupResult = dbHelpers.addUser(username, password);
  // console.log(`received POST users request. request body - `, username + '  ' + password);
  dbHelpers.addUser(username, password, (sigupResult) => {
    if ( sigupResult === 0 ) {
      req.session.regenerate(function(err) {
        req.session.user = username;
        req.session.save();
        currentSession = req.session;
        res.send(`0`); //user added successfully
      });
    } else if ( sigupResult === 1 ) {
      res.send(`1`); //user already exists
    } else {
      res.send(`unknown error signing up user ${username}`);
    }
  });


});


// clicking on a watcher in watchers tab --> GET request to '/user/profile'  --> mongo query to retrieve that user's profile and display it on the right
// input : username
// action : retrieve user's information from user table
app.get('/user/profile', function(req, res) {
  let userName = req.query.username;
  // console.log('Inside the get /user/profile..request is. ', req.query);
  // console.log('Inside the get /user/profile..username is. ', userName);

  //get user info if in database
  dbHelpers.getUser(userName, (result) => {res.send(result)});
});


// clicking on 'Add to Watchlist' near a movie ---> POST request to '/user/watchlist' --> mongo query to add that movie onto our  watch list table
// input : user name, movie name
// action : save movie object to favorites table
// response ; send back array of users watch list (movie ids)
app.post('/user/watchlist', function(req, res) {
  var userName = req.body.userName;
  var movie = req.body.movie;
  dbHelpers.addWatchlist(userName, movie, (watchList) => {

    res.send('posted to watchList');

  })

});

//delete a movie from user's watch list, and return updated list
app.delete('/user/watchlist', function(req, res) {
  var userName = req.query.userName;
  var movie = req.query.movie;
  console.log('in DELETE /user/watchlist....query is...', req.query.userName);
  if ( userName !== undefined ) {
    dbHelpers.deleteWatchlist(userName, movie, (watchList) => {
      // cb(watchList)
      res.send('deleted from watchList');
    });
  }
});

//get a users watch list
app.get('user/watchlist', function(req, res) {
  var userName = req.query.userName;
  dbHelpers.getWatchlist(userName, (list) => {
    res.send(list)
  })
})

//given movie id, get back movie title from database
app.get('/movieTitle', function(req, res) {
  var id = req.query.id;
  dbHelpers.getMovieTitleFromId(id, (title) => {
    res.send(title)
  })
});

app.get('/movieTitles', function(req, res) {
  var ids = req.query.ids;
  console.log('ids from GET /movieTitles...', ids);
  // var resolve = (title) => title;
  if (ids.length > 0) {
    let allMovieTitles = ids.map( id => {
      var getTitle = new Promise(resolve => {
        dbHelpers.getMovieTitleFromId(id, resolve);
      })
      return getTitle;
    });

    Promise.all(allMovieTitles).then( movieTitles => {console.log('all movie titles for ids..', movieTitles); res.send(movieTitles)});
  } else {
    res.send([])
  }
});

// clicking on 'Mark as watched' near a movie --> POST request to '/user/watchedlist' --> mongo query to add that movie to "Recently Watched" table
// input : user name, movie name
// action : save in Recently Watched table
// response ; send back array of users recently watched (movie ids)
app.post('/user/watchedlist', function(req, res) {
  var userName = req.body.userName;
  var movie = req.body.movie;
  dbHelpers.addWatchedlist(userName, movie, (watchedList) => {
    cb(watchedList)
  })
});

// input : user name, movie name
// action : delete from Recently Watched table
// response ; send back array of users recently watched (ids)
app.delete('/user/watchedlist', function(req, res) {
  var userName = req.query.userName;
  var movie = req.query.movie;
  dbHelpers.deleteWatchedlist(userName, movie, (watchedList) => {
    cb(watchedList)
  })
});

//get user's watchlist
app.get('user/watchedlist', function(req, res) {
  var userName = req.query.userName;
  dbHelpers.getWatchedlist(userName, (list) => {
    res.send(list)
  })
})

//add movie to user's favorite's list
app.post('/user/favorites', function(req, res) {
  var userName = req.body.userName;
  var movie = req.body.movie;
  dbHelpers.addFavorite(userName, movie, (list) => {
    cb(list)
  })
})

//delete movie from user's favorite list
app.delete('/user/favorites', function(req, res) {
  var userName = req.query.userName;
  var movie = req.query.movie;
  dbHelpers.deleteFavorite(userName, movie, (list) => {
    cb(list)
  })
})

//get a user's list of favorite movies
app.get('user/favorites', function(req, res) {
  var userName = req.query.userName;
  dbHelpers.getFavorites(userName, (list) => {
    res.send(list)
  })
})

// clicking on Heart near a watcher in watchers tab --> POST request to 'user/following' --> mongo query to add that watcher onto our "following" table
app.post('/user/following', function(req, res) {
  var userName = req.body.userName;
  var movie = req.body.movie;
  dbHelpers.addFollowing(userName, movie, (list) => {
    cb(list)
  })
})

//delete movie from user's favorite list
app.delete('/user/following', function(req, res) {
  var userName = req.query.userName;
  var movie = req.query.movie;
  dbHelpers.deleteFollowing(userName, movie, (list) => {
    cb(list)
  })
})

//get list of user's a particular user is following
app.get('user/following', function(req, res) {
  var userName = req.query.userName;
  dbHelpers.getFollowing(userName, (list) => {
    res.send(list)
  })
})

//get a list of all users
app.get('/users', function(req, res) {
  console.log('here in GET users')
  dbHelpers.getUsers((users) => {
    res.send(users)
  })
});

app.get('/image',function(req,res){

  var path = req.query.path;
  console.log('path inside get/image',path);
  dbHelpers.getImagesByPath(path,function(err,data){
    if(err){
      console.log('error inside get/image',err)
    }else{
      res.send(data);
    }
  })

})



app.listen(PORT, (err, response) => {
  if (!err) {
    console.log(`listening on port ${PORT}`);
  }
});


