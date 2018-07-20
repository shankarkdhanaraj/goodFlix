import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
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
      isLoggedIn: false,
      currentPage: 'Home', //'Home', 'Watchers', 'My Movies'
      isLogin: true,
      sessionId: null,
      clickeditem:'',
      searchResults: false,
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

}

  changeCurrentPage(page) {
    this.setState({currentPage: page, searchResults: false });
  }

  displaySearchResults() {
    this.setState({searchResults: true });
  }

  search(term){
    var that= this;
    this.changeCurrentPage('movie');

    $.ajax({
      url:'/movies',
      type:'POST',
      data:{search:term}
    }).done(function(data){
      console.log('data has been posted from search',data);

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
    this.setState({sessionId: sessionId, userName: user, isLoggedIn: true, isLogin: false});
  }

  logoutUser() {
    this.setState({sessionId: null, userName: null, isLoggedIn: false, isLogin: true});
  }

  render() {
    let activePage;
    if ( this.state.isLoggedIn && !this.state.searchResults ) {
      if ( this.state.currentPage === 'Home') {
        activePage = <WatcherHome search={this.search} userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} searchByMovie={this.searchByMovie} />;
      
      } else if ( this.state.currentPage === 'My Movies' ) {
        activePage = <MyMovies userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} />;

      } 
      else if(this.state.currentPage === 'movie'){
        activePage = <Movie searchByMovie={this.searchByMovie} getMovie={this.state.clickeditem[0]} />
      } 
      else{
        activePage = <div>Under Construction</div>
      }
    } else if ( !this.state.isLoggedIn  && !this.state.searchResults) {
      activePage = <LandingPage isLogin={this.state.isLogin} loginUser={this.loginUser}/>;
    } else {
      activePage = <SearchResults/>;
    }

    return (
      <Grid>
        <Grid.Row >
          <Grid.Column>
          <Segment>
            <Title isLoggedIn={this.state.isLoggedIn} userName={this.state.userName}/>
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
