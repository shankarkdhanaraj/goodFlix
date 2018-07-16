import React from 'react';
import { Grid } from 'semantic-ui-react';
import UsernamePassword from './UsernamePassword.jsx';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Grid>
        <Grid.Row>
        <Grid.Column>
          <UsernamePassword/>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};