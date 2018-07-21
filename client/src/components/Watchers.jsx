import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import FollowingList from './FollowingList.jsx';
import WatcherProfile from './WatcherProfile.jsx';
import ReviewsList from './ReviewsList.jsx';


export default class Watchers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedUser: '',
      wathcersList: [],
      followingList: ['John Doe', 'Jane Doe', 'Emily', 'Jon', 'Pooja', 'Magee', 'Bella', 'Nick', 'Rupa', 'Leslie', 'Joe', 'Shankar'],
      selectedUserReviews: [
        {movie: 'Terminator', stars: 3, review: 'Excellent movie...'},
        {movie: 'Terminator 2: Judgement Day', stars: 4, review: 'Great sequel...'},
        {movie: 'Superman', stars: 2, review: 'Meh...'},
        {movie: 'Saving Private Ryan', stars: 5, review: 'Fantastic!!! Must see'},
        {movie: 'Total Recall', stars: 4, review: 'Classic!!!'}
      ]
    }

  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <FollowingList list={this.props.watchers} listTitle={"Watchers"}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Grid >
              <Grid.Row stretched>
                <Grid.Column>
                  <Grid.Row>
                    <Segment>
                      <WatcherProfile/>
                    </Segment>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment>
                     <ReviewsList list={this.state.selectedUserReviews} />
                    </Segment>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

};

