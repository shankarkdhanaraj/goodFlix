import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import Title from './components/Title.jsx'
import NavBar from './components/NavBar.jsx';
import Movie from './components/Movie.jsx';
import 'semantic-ui-css/semantic.min.css';

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
    <Movie/>
  </div>
  );
}

};

ReactDOM.render(<App/>, document.getElementById('app'));
