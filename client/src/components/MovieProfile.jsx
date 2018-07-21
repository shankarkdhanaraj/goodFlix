import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { Rating } from 'semantic-ui-react'
import Comments from './Comments.jsx'
import { Container, Divider, Grid, Header, Image } from 'semantic-ui-react'
import Item from './Item.jsx'



const extra = (
  <a>
    <Icon name='user' />
    50 Reviews
  </a>
)

export default class MovieProfile extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      watchlist: false
    };

    this.toggleWatchList = this.toggleWatchList.bind(this);
  }

  toggleWatchList() {
    let addToWatchlist = !this.state.watchlist;
    this.setState({watchlist: !this.state.watchlist})
    if (this.props.isLoggedIn) {
      if ( addToWatchlist ) {
        let headers = new Headers();
        let userMovie = {
          userName: this.props.userName,
          movie: this.props.movie.title
        };
        headers.append('Content-Type', 'application/json');
        let options = {
          method: 'POST',
          headers: headers,
          mode: 'cors',
          cache: 'default',
          credentials: 'include',
          body: JSON.stringify(userMovie)
        };

        fetch('/user/watchlist', options)
          .then( (response) => response.text() )
          .then( (responseTxt) => {
            console.log('response from POST to /user/watchlist...', responseTxt);
          })
          .catch( (err) => console.log('Unknown error when adding to watchlist...', err.message));

      } else {
        let headers = new Headers();
        let userMovie = {
          userName: this.props.userName,
          movie: this.props.movie.title
        };
        headers.append('Content-Type', 'application/json');
        let options = {
          method: 'DELETE',
          headers: headers,
          mode: 'cors',
          cache: 'default',
          credentials: 'include'
        };
        let esc = encodeURIComponent;
        let query = Object.keys(userMovie)
                     .map(k => esc(k) + '=' + esc(userMovie[k]))
                     .join('&');

        fetch('/user/watchlist?' + query, options)
          .then( (response) => response.text() )
          .then( (responseTxt) => {
            console.log('response from POST to /user/watchlist...', responseTxt);
          })
          .catch( (err) => console.log('Unknown error when removing from watchlist...', err.message));
      }
    }
  }

  render() {
    let img = 'https://ee.iva-api.com/api/Images/'+`${this.props.movie.images[0].FilePath}`+'/Redirect?subscription-Key=e55978e3a34543879fd13418397833d3'
    let title = '';
    let castAndCrew = '';
    let description = '';
    let rating = <div></div>;
    let watchlist = <div></div>;
    if ( this.props.movie !== '' ) {
      title = this.props.movie.title;
      if ( this.props.movie.contributors.length >= 5 ) {
        castAndCrew = [];
        castAndCrew.push(`${this.props.movie.contributors[0].PersonName} / ${this.props.movie.contributors[0].Job}`);
        castAndCrew.push(`${this.props.movie.contributors[1].PersonName} / ${this.props.movie.contributors[1].Job}`);
        castAndCrew.push(`${this.props.movie.contributors[2].PersonName} / ${this.props.movie.contributors[2].Job}`);
        castAndCrew.push(`${this.props.movie.contributors[3].PersonName} / ${this.props.movie.contributors[3].Job}`);
        castAndCrew.push(`${this.props.movie.contributors[4].PersonName} / ${this.props.movie.contributors[4].Job}`);
      } else {
        castAndCrew = "Are Lost";
      }

      if ( this.props.movie.descriptions.length > 0 ) {
        description = this.props.movie.descriptions[0].Description;
      }
    }

    if(this.props.isLoggedIn) {
      rating = <Rating icon='heart' defaultRating={3} maxRating={5} />;
      watchlist = <Card.Content extra> <Icon color={this.state.watchlist? "teal" : "grey"} size="large" onClick={ () => this.toggleWatchList() } name="eye" /> </Card.Content>;
    }
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card
                  image = {img}
                  header={title} />
                  <Card.Content> {rating} </Card.Content>
                  {watchlist}
              </Grid.Column>
              <Grid.Column width={8}>
                <Card>
                  <Card.Content header='Cast & Crew' />
                  <Card.Content description={castAndCrew[0]} />
                  <Card.Content description={castAndCrew[1]} />
                  <Card.Content description={castAndCrew[2]} />
                  <Card.Content description={castAndCrew[3]} />
                  <Card.Content description={castAndCrew[4]} />
                  <Card.Content extra></Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Card.Content header='Synopis' />
                  <Card.Content description={description} />
                  <Card.Content extra></Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={4}>
                <h2> Review Go here </h2>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }

};

