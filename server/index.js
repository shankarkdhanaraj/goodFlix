var express = require('express');
const PORT = process.env.PORT || 3000;
var dbHelpers = require('../database/helpers.js');
var app = express();

app.use(express.static('client/dist'));

//dbHelpers.addUser(userName, password)
//dbHelpers.handleLogin(userName, password)


// GET landing page
app.get('/', function(req, res) {

});


//'sign in' button --> GET request to '/user/home' --> mongo query to retrieve that particular user from users table
// input : username,password
app.get('/user/home', function(req, res) {

});

//clicking on search button --> should send a GET request to '/movies' --> mongo query to retrieve (10) movies from API input : search query
// API : https://ee.iva-api.com/api/Entertainment/Search/?ProgramTypes=Movie&Title=fight&subscription-Key=8e97e89696b241678e66bdd004c7abd3
//Output : Title, Year , Original Language , Runtime , Iva Rating , Official Site Url
app.get('/movies', function(req, res) {

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

});


// clicking on a watcher in watchers tab --> GET request to '/user/profile'  --> mongo query to retrieve that user's profile and display it on the right
// input : username
// action : retrieve user's information from user table
app.get('/user/profile', function(req, res) {

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


