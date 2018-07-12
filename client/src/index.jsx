import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {

constructor(props) {
super(props);

}

render() {
return (
  <div>
    <h1>GoodFlix</h1>
    <h4>The only way to find your next movie!!!</h4>
    <Button>Primary</Button>
    <h6>Brought to you by hello-world of RPT07</h6>
    <p>Testing automatic deploys</p>
    <p> hello again </p>
    <p> Testing React </p>
  </div>
  );
}

};

ReactDOM.render(<App/>, document.getElementById('app'));
