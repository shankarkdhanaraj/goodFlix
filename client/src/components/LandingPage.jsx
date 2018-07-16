import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Login from './Login.jsx'
import TopMoviesList from './TopMoviesList.jsx';


export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topMoviesList: ['Matrix', 'Fight Club', 'Thor', 'Iron Man', 'Avengers', 'Lord of the Rings: Fellowship of the Ring', 'Die Hard', 'Lethal Weapon', 'Citizen Kane']
    }

  }

  render() {
    let loginSignup = this.props.isLogin ? <Login/> : <Signup/>
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              {loginSignup}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <TopMoviesList list={this.state.topMoviesList} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};