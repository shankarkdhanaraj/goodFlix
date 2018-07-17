import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import UsernamePassword from './UsernamePassword.jsx';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.gotoSignup = this.gotoSignup.bind(this);
  }

  login(userPassword) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      // params: {
      //   username: userPassword.username,
      //   password: userPassword.password
      // }
    };

    let url = new URL(`http://localhost:3000/user/home`);
    let params = {
      username: userPassword.username,
      password: userPassword.password
    };
    url.search = new URLSearchParams(params)
    fetch(url, options)
      .then( (response) => response.text() )
      .then( (value) => alert('value ' + value) )
      .catch( (err) => console.log('Unknown error when logging in...', err.message));
  }

  gotoSignup() {
    this.props.changeToSignup();
  }

  render() {

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h3>Login</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <UsernamePassword clickSubmit={this.login}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div>No account? <Label as='a' basic onClick={ this.gotoSignup }> Sign up </Label></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};