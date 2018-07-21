import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import WatchList from './WatchList.jsx';
import WatchedList from './WatchedList.jsx';
import FollowingList from './FollowingList.jsx';



export default class WatcherHome extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      watchList: ['Fight Valley', 'Fight, Zatôichi, Fight', 'Fire Fight', 'Diamond Fight', 'Cock Fight'],
      watchedList: ['Terminator', 'Terminator 2: Judgement Day', 'Superman', 'Saving Private Ryan', 'Total Recall'],
      followingList: ['John Doe', 'Jane Doe', 'Emily', 'Jon', 'Pooja', 'Magee', 'Bella', 'Nick', 'Rupa', 'Leslie', 'Joe', 'Shankar']
    }

  }



  render() {
    debugger;
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <WatchList search={this.props.search} list={this.props.watchList} getSearch={this.props.getSearch} searchByMovie={this.props.searchByMovie} userName={this.props.userName} />
            </Segment>
            <Segment>
              <WatchedList list={this.state.watchedList} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <FollowingList list={this.props.followingList} listTitle={"Following"} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};

