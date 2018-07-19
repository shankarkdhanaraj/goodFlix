import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FollowingList from './FollowingList.jsx';
import WatcherProfile from './WatcherProfile.jsx';


export default class Watchers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      watchList: ['Fight Club', 'Tinker Bell', 'Mullholand Drive', 'Dark Crystal', 'The last Unicorn'],
      watchedList: ['Terminator', 'Terminator 2: Judgement Day', 'Superman', 'Saving Private Ryan', 'Total Recall'],
      followingList: ['John Doe', 'Jane Doe', 'Emily', 'Jon', 'Pooja', 'Magee', 'Bella', 'Nick', 'Rupa', 'Leslie', 'Joe', 'Shankar']
    }

  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <FollowingList list={this.state.followingList} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Grid >
              <Grid.Row>
                <Segment>
                  <WatcherProfile/>
                </Segment>
              </Grid.Row>
              <Grid.Row>
                <Segment>
                  <h4> Reviews go here </h4>
                </Segment>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};

