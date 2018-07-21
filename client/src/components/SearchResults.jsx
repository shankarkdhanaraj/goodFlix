import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import SearchResultsList from './SearchResultsList.jsx';
import Movie from './Movie.jsx';
import MovieProfile from './MovieProfile.jsx';



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
    };

    this.getClickedMovieInfo = this.getClickedMovieInfo.bind(this);

  }

  getClickedMovieInfo(movie) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include',
      body: JSON.stringify({title:movie})
    };

    fetch('/movie', options)
      .then( (response) => response.json() )
      .then( (responseObject) => {
        console.log('response for movie...', responseObject[0]);
        this.setState({selectedMovie:responseObject[0]});
      });
  }

  render() {

    return (
      <Grid columns={2} divided>
        <Grid.Row stretched>
          <Grid.Column>
            <Segment>
              <SearchResultsList list={this.props.searchResults} isLoggedIn={this.props.isLoggedIn} userName={this.props.userName} getClickedMovieInfo={this.getClickedMovieInfo}/>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Grid >
              <Grid.Row stretched>
                <Grid.Column>
                  <Grid.Row>
                    <Segment>
                      <MovieProfile isLoggedIn={this.props.isLoggedIn} userName={this.props.userName} movie={this.state.selectedMovie} />
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

