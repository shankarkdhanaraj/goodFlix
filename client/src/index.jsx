import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button, Container, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react'
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
import WatcherHome from './components/WatcherHome.jsx';
import Movies from './components/Movies.jsx'
import MyMovies from './components/MyMovies.jsx'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isLoggedIn: false,
      currentPage: 'Home' //'Home', 'Watchers', 'My Movies'
    };

    this.changeCurrentPage = this.changeCurrentPage.bind(this);

  }

  changeCurrentPage(page) {
    this.setState({currentPage: page});
  }

  render() {
    let activePage;
    if ( this.state.currentPage === 'Home') {
      activePage = <WatcherHome userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} />;
    } else if ( this.state.currentPage === 'My Movies' ) {
      activePage = <MyMovies userName={this.state.userName} isLoggedIn={this.state.isLoggedIn} />;
    } else {
      activePage = <div> Under Construction </div>;
    }
    return (
      <div>
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
            <NavBar changePage={this.changeCurrentPage}/>
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
      </div>
    );
  }

};

ReactDOM.render(<App/>, document.getElementById('app'));
