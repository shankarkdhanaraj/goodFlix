var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
const PORT = process.env.PORT || 3000;
var dbHelpers = require('../database/helpers.js');
var apihelper = require('../api/api.js')
var app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('client/dist'));

var currentSession;
//dbHelpers.addUser(userName, password)
//dbHelpers.handleLogin(userName, password)


//dbHelpers.getMovieInfoAPI('Platoon', (movie) => dbHelpers.saveMovie(movie, (movie) => dbHelpers.getDbMovieInfo((movie), (movie) => console.log(movie))))

// GET landing page
app.get('/', function(req, res) {

});


//'sign in' button --> GET request to '/user/home' --> mongo query to retrieve that particular user from users table
// input : username,password
app.get('/user/home', function(req, res) {

  let username = req.query.username;
  let password = req.query.password;
  let logResult = dbHelpers.handleLogin(username, password);
  // console.log('Origina URL for GET uer/home. ', req.originalUrl);
  // console.log('Request query for GET uer/home. ', req.query);
  console.log(`received GET user/home request. user and passowrd:- `, username + '  ' + password);

  if ( logResult === 0 ) {
    req.session.username = username;
    req.session.save();
    currentSession = req.session;
    res.send(`user ${username} logged in successfully`);
  } else if ( logResult === 1 ) {
    res.send(`user ${username} already exists`);
  } else if ( logResult === 2 ) {
    res.send(`user ${username} and password doesn't match`);
  } else {
    res.send(`unknown error logging in user ${username}`);
  }

  //use dbHelpers.getUser(userName, cb) cb returns obect {watchlist: array, recentlyWatched: array, favorites: array, following: array, userName: string}


});

//clicking on search button --> should send a POST request to '/movies' --> mongo query to retrieve (10) movies from API input : search query
// API : https://ee.iva-api.com/api/Entertainment/Search/?ProgramTypes=Movie&Title=fight&subscription-Key=8e97e89696b241678e66bdd004c7abd3
//Output : Title, Year , Original Language , Runtime , Iva Rating , Official Site Url
app.post('/movies', function(req, res) {

	console.log('in post',req.body.search);

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


//clicking on movie name in homepage --> GET request to '/movie'  --> mongo query to retrieve details about that particular movie from API
//input : movie name
// API : https://ee.iva-api.com/api/Entertainment/Match/?ProgramType=Movie&Title=titanic&subscription-Key=8e97e89696b241678e66bdd004c7abd3
// Output : Title , Original Release Date , Year , Original Language , Contributers OBJECT(Person Id , Person Name, Character, Job ) , Descriptions OBJECT ( Description ) , Images OBJECT (File Path), Iva Rating
app.get('/movie', function(req, res) {

});



// clicking on register button --> POST request to '/users' --> mongo query to create a new watcher in db
// input : username, password
// action : add new user to watchers table
app.post('/users', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let sigupResult = dbHelpers.addUser(username, password);
  console.log(`received POST users request. request body - `, username + '  ' + password);
  if ( sigupResult === 0 ) {
    res.send(`user ${username} added successfully`);
  } else if ( sigupResult === 1 ) {
    res.send(`user ${username} already exists`);
  } else {
    res.send(`unknown error signing up user ${username}`);
  }

});


// clicking on a watcher in watchers tab --> GET request to '/user/profile'  --> mongo query to retrieve that user's profile and display it on the right
// input : username
// action : retrieve user's information from user table
app.get('/user/profile', function(req, res) {
  //dbHelpers.getUser(userName, callback)
});


// clicking on 'Add to Watchlist' near a movie ---> POST request to '/user/watchlist' --> mongo query to add that movie onto our  watch list table
// input : movie name
// action : save movie object to favorites table
app.post('/user/watchlist', function(req, res) {

});

app.delete('/user/watchlist', function(req, res) {

});


// clicking on 'Mark as watched' near a movie --> POST request to '/user/watchedlist' --> mongo query to add that movie to "Recently Watched" table
// input : movie name
// action : save in Recently Watched table
app.post('/user/watchedlist', function(req, res) {

});

// clicking on Heart near a watcher in watchers tab --> POST request to 'user/following' --> mongo query to add that watcher onto our "following" table
app.post('/user/following', function(req, res) {

});


app.get('/users', function(req, res) {

});



app.listen(PORT, (err, response) => {
  if (!err) {
    console.log(`listening on port ${PORT}`);
  }
});


