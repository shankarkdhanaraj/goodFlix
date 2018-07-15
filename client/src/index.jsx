import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
import WatcherHome from './components/WatcherHome.jsx';
import 'semantic-ui-css/semantic.min.css';
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react'
import Movies from './components/Movies.jsx'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isLoggedIn: false
    }

  }

  render() {
    return (
      <div>
        <Title isLoggedIn={this.state.isLoggedIn} userName={this.state.userName}/>
        <NavBar/>
         {/*<Movie/>*/}
        {/*<WatcherHome userName={this.state.userName} isLoggedIn={this.state.isLoggedIn}/>*/}
        <Movies/>
      </div>
    );
  }

};

ReactDOM.render(<App/>, document.getElementById('app'));
