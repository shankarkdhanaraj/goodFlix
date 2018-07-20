import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import SearchResultsList from './SearchResultsList.jsx';
import Movie from './Movie.jsx';


export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: '',
      searchResults: [
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
              <SearchResultsList list={this.state.searchResults} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Grid >
              <Grid.Row stretched>
                <Grid.Column>
                  <Grid.Row>
                    <Segment>
                      <Movie/>
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

