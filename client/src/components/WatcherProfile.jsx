import React from 'react';
import { Grid, Segment, Image, Icon } from 'semantic-ui-react';
import WatchList from './WatchList.jsx';
import WatchedList from './WatchedList.jsx';
import FollowingList from './FollowingList.jsx';


export default class WatcherProfile extends React.Component {

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
                <Image size='medium' circular>
                  <Icon name='user' size='massive' />
                </Image>
              </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <Grid.Row>
                <h4> Username: John Doe </h4>
              </Grid.Row>
              <Grid.Row>
                <h4> Member Since: July 4th 2010 </h4>
              </Grid.Row>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};