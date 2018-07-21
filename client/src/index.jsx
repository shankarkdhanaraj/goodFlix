import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
import MovieProfile from './components/MovieProfile.jsx';
import WatcherHome from './components/WatcherHome.jsx';
import MyMovies from './components/MyMovies.jsx';
import LandingPage from './components/LandingPage.jsx';
import Watchers from './components/Watchers.jsx';
import SearchResults from './components/SearchResults.jsx';




class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      userWatchList: [],
      userFavoriteList: [],
      watchers: [],
      isLoggedIn: false,
      currentPage: 'Home', //'Home', 'Watchers', 'My Movies'
      isLogin: true,
      sessionId: null,
      clickeditem:'',
      isSearchResults: false,
      searchResults: '',
      clickeditem:''
    };

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.search = this.search.bind(this);
    this.searchByMovie = this.searchByMovie.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.search = this.search.bind(this);
    this.searchByMovie = this.searchByMovie.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);

  }


  componentDidMount() {
    // this.getUserInfo();
  }

  changeCurrentPage(page) {

    this.getUserInfo(this.state.userName, this.state.sessionId);
    this.setState({currentPage: page, isSearchResults: false });
    if ( page === 'Watchers' || page == 'Home') {
      this.getAllUsers();
    }
  }

  getImage(path){

    console.log('path inside getImage',path);

  $.ajax({
      url: '/image',
      type:'GET',
      data:{path:path},
      success: (data) => {
        console.log('data from get/image',data)
      },
      error: (err) => {
        console.log('error in getimage', err);
      }
    });

  }

  displaySearchResults() {
    this.setState({isSearchResults: true });
  }

  search(term){
    var that= this;
    // this.changeCurrentPage('movie');

    $.ajax({
      url:'/movies',
      type:'POST',
      data:{search: term}
    }).done( (data) => {
      console.log('data has been posted from search',data.body.Hits);
      this.setState({searchResults: data.body.Hits, isSearchResults: true});

    //   $.ajax({
    //   url: '/movie',
    //   type:'GET',
    //   success: (movie) => {
    //     that.setState({
    //       clickeditem: movie
    //     })
    //     console.log('success of getMovie',movie);
    //   },
    //   error: (err) => {
    //     console.log('error in getMovie', err); }
    // });
    })

  }

  searchByMovie(title){
    console.log('inside searchByMovie function',title);
    var that=this;
    // this.changeCurrentPage('movie');

    $.ajax({
      url:'/movie',
      type:'POST',
      data:{title:title}
    }).done(function(data){
     console.log('data has been posted from search');
     that.getMovie(data?data[0]:{});

    //   $.ajax({
    //   url: '/movie',
    //   type:'GET',
    //   success: (movie) => {
    //     that.setState({
    //       clickeditem: movie
    //     })
    //     console.log('success of getMovie',movie);
    //     that.changeCurrentPage('movie');
    //   },
    //   error: (err) => {
    //     console.log('error in getMovie', err); }
    // });
    })
  }

  getMovie(targetMovie){
    $.ajax({
      url: '/movie',
      type:'GET',
      success: (data) => {
        var clickMovie = data.filter(
          (val)=>
          val.title==targetMovie.title
          );
        this.setState({
          clickeditem: clickMovie?clickMovie:{}
        });
        this.changeCurrentPage('movie');
        console.log('state of clickeditem',this.state.clickeditem);
      },
      error: (err) => {
        console.log('error in getMovie', err);
      }
    });
  }

  loginUser(user, sessionId) {
    this.getUserInfo(user, sessionId);
    // this.setState({sessionId: sessionId, userName: user, isLoggedIn: true, isLogin: false});
  }

  getAllUsers() {

  console.log('getAllUSers called');
  let that = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    };

    fetch('/users', options)
      .then( (response) => {
        console.log(response);
        return response.json();
      })
      .then( (responseObj) => {
        that.setState({watchers: responseObj})
        console.log('response from GET /users is...', responseObj)
      })
      .catch( (err) => console.log('Error getting user info...', err.message));

  }

  getUserInfo(user, sessionId) {

    this.getAllUsers();
    if ( user === undefined ) { alert('userName is undefined') }
    console.log('getUserInfo called');
    let that = this;
    // if ( this.state.isLoggedIn ) {
      let headers = new Headers();
      let params = {
        username: user
      };
      headers.append('Content-Type', 'application/json');
      let options = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default',
        credentials: 'include'
      };

      let esc = encodeURIComponent;
      let query = Object.keys(params)
                   .map(k => esc(k) + '=' + esc(params[k]))
                   .join('&');
      console.log(' get user info query is...', query);
      fetch('/user/profile/?' + query, options)
        .then( (response) => response.json() )
        .then( (responseObj) => {
          let watchListMovieIds = responseObj.watchList;
          console.log('user watchlist is ...', responseObj.watchList);
          query = watchListMovieIds
                       .map(id => ('ids[]=' + id))
                       .join('&');
          console.log(' get user info query is...', query);
          return fetch('/movieTitles?' + query, options);
        })
        .then( response => response.json() )
        .then( responseObj => that.setState({userWatchList: responseObj}) )
        .catch( (err) => console.log('Error getting user info...', err.message))
        .finally( () => this.setState({sessionId: sessionId, userName: user, isLoggedIn: true, isLogin: false}) );
    // }
  }

  logoutUser() {
    this.setState({sessionId: null, userName: null, isLoggedIn: false, isLogin: true});
  }

  render() {
    let activePage;

    if ( this.state.isLoggedIn && !this.state.isSearchResults ) {
      if ( this.state.currentPage === 'Home') {
        debugger;
        activePage = <WatcherHome followingList={this.state.watchers} search={this.search} userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} searchByMovie={this.searchByMovie} watchList={this.state.userWatchList} />;

      } else if ( this.state.currentPage === 'My Movies' ) {
        activePage = <MyMovies userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} watchList={this.state.userWatchList} />;

      }
      else if(this.state.currentPage === 'movie'){
        activePage = <MovieProfile isLoggedIn={this.props.isLoggedIn} userName={this.props.userName} movie={this.state.clickeditem[0]}  />;
      }

      else{
        activePage = <Watchers watchers={this.state.watchers} />;
      }
    } else if ( !this.state.isLoggedIn  && !this.state.isSearchResults) {
      activePage = <LandingPage isLogin={this.state.isLogin} loginUser={this.loginUser}/>;
    } else {
      activePage = <SearchResults searchResults={this.state.searchResults} isLoggedIn={this.state.isLoggedIn} userName={this.state.userName}/>;
    }


    return (
      <Grid>
        <Grid.Row >
          <Grid.Column>
          <Segment>
            <Title isLoggedIn={this.state.isLoggedIn} userName={this.state.userName} getUserInfo={this.getUserInfo} />
          </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column>
          <Segment>
          <NavBar isLoggedIn={this.state.isLoggedIn} displaySearchResults={this.displaySearchResults} changePage={this.changeCurrentPage} search={this.search} logoutUser={this.logoutUser} sessionId={this.state.sessionId}/>
          </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >
          <Grid.Column>
          <Segment>
                  {activePage}
          </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};

ReactDOM.render(<App/>, document.getElementById('app'));
