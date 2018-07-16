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
    alert(`Signing up...`);
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
            <UsernamePassword onSubmit={this.signup}/>
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