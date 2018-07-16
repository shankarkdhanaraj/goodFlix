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
    alert(`Logging...`);
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
            <UsernamePassword onSubmit={this.login}/>
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