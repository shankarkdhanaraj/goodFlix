import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import UsernamePassword from './UsernamePassword.jsx';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }

  signup(userPassword) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(userPassword)
    };

    let url = `http://localhost:3000/users`;
    fetch(url, options)
      .then( (response) => response.text() )
      .then( (value) => alert('value ' + value) )
      .catch( (err) => console.log('Unknown error when signing up...', err.message));
  }

  gotoLogin() {
    this.props.changeToLogin();
  }

  render() {

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <h3>Signup</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <UsernamePassword clickSubmit={this.signup}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <div>Have account? <Label as='a' basic onClick={ this.gotoLogin }> Login </Label></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};