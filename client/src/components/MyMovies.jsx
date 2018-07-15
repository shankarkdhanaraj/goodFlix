import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import WatchList from './WatchList.jsx';
import WatchedList from './WatchedList.jsx';
import FavoritesList from './FavoritesList.jsx';


export default class MyMovies extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      watchList: ['Fight Club', 'Tinker Bell', 'Mullholand Drive', 'Dark Crystal', 'The last Unicorn'],
      watchedList: ['Terminator', 'Terminator 2: Judgement Day', 'Superman', 'Saving Private Ryan', 'Total Recall'],
      favoritesList: ['Matrix', 'Fight Club', 'Thor', 'Iron Man', 'Avengers']
    }

  }

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <FavoritesList list={this.state.favoritesList} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <WatchList list={this.state.watchList} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <WatchedList list={this.state.watchedList} />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};

