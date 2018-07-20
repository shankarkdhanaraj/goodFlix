import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import TopMoviesList from './TopMoviesList.jsx';


export default class LandingPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      topMoviesList: ['Matrix', 'Fight Club', 'Thor', 'Iron Man', 'Avengers', 'Lord of the Rings: Fellowship of the Ring', 'Die Hard', 'Lethal Weapon', 'Citizen Kane']
    };

    this.change = this.change.bind(this);

  }

  change() {
    this.setState({isLogin: !this.state.isLogin})
  }

  render() {
    let loginSignup = this.state.isLogin ? <Login changeToSignup={this.change} loginUser={this.props.loginUser}/> : <Signup changeToLogin={this.change} loginUser={this.props.loginUser}/>;
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