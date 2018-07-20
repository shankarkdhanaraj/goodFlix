import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
import WatcherHome from './components/WatcherHome.jsx';
import Movies from './components/Movies.jsx';
import MyMovies from './components/MyMovies.jsx';
import LandingPage from './components/LandingPage.jsx';
import Watchers from './components/Watchers.jsx';



class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: null,
      isLoggedIn: false,
      currentPage: 'Home', //'Home', 'Watchers', 'My Movies'
      isLogin: true,
      sessionId: null
    };

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);

  }

  changeCurrentPage(page) {
    this.setState({currentPage: page});
  }

  search(term){

    $.ajax({
      url:'/movies',
      type:'POST',
      data:{search:term}
    }).done(function(data){
      console.log('data has been posted from search',data);
    })

  }

  loginUser(user, sessionId) {
    this.setState({sessionId: sessionId, userName: user, isLoggedIn: true, isLogin: false});
  }

  logoutUser() {
    this.setState({sessionId: null, userName: null, isLoggedIn: false, isLogin: true});
  }

  render() {
    let activePage;
    if ( this.state.isLoggedIn ) {
      if ( this.state.currentPage === 'Home') {
        activePage = <WatcherHome userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} />;
      } else if ( this.state.currentPage === 'My Movies' ) {
        activePage = <MyMovies userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} />;
      } else {
        activePage = <Watchers/>;
      }
    } else {
      activePage = <LandingPage isLogin={this.state.isLogin} loginUser={this.loginUser}/>;
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
          <NavBar isLoggedIn={this.state.isLoggedIn} changePage={this.changeCurrentPage} search={this.search} logoutUser={this.logoutUser} sessionId={this.state.sessionId}/>
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
