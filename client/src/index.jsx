import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import NavBar from './components/NavBar.jsx';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {

constructor(props) {
<<<<<<< HEAD
super(props);
=======
  super(props);

  this.state = {
    userName: '',
    isLoggedIn: true
  }
>>>>>>> modified database for heroku

}

render() {
return (
  <div>
    <h1>GoodFlix</h1>
    <NavBar/>
    <h4>The only way to find your next movie!!!</h4>
    <Button primary>Primary</Button>
    <h6>Brought to you by hello-world of RPT07</h6>
    <p>Testing automatic deploys</p>
    <p> hello again </p>
    <p> Testing React </p>
  </div>
  );
}

};

ReactDOM.render(<App/>, document.getElementById('app'));
