import React from 'react';
import { Image, List, Label, Icon, Grid, Segment, Rating } from 'semantic-ui-react';

export default class ReviewsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movie: this.props.review.movie,
      stars: this.props.review.stars,
      review: this.props.review.review
    };

    this.goToMoviePage = this.goToMoviePage.bind(this);
  }

  goToMoviePage() {
    alert('clicked movie...', this.state.movie);
  }

  render() {


    // return (
    //   <List.Item>


    //             <List.Icon onClick={ () => this.goToMoviePage() } name="film">
    //               <a>{this.state.movie}</a>
    //             </List.Icon>

    //             <List.Content> {this.state.review} </List.Content>


    //   </List.Item>
    // );

    return (
      <List.Item>
      <Grid>
        <Grid.Row columns={2} stretched>
          <Grid.Column>
            <Grid.Row>
              <List.Content><List.Icon name="film" /> <a>{this.state.movie}</a></List.Content>
            </Grid.Row>
            <Grid.Row>
              <Rating defaultRating={this.state.stars} maxRating={5} disabled />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column>
            <List.Content> {this.state.review} </List.Content>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </List.Item>
    );
  }

};

