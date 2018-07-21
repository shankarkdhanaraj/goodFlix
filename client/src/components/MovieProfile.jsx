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

const description = ['Jurassic Park is an American science fiction media franchise centered on a disastrous attempt to create a theme park of cloned dinosaurs. ',
  'The dinosaurs escape confinement and terrorize the human characters. It began in 1990 when Universal Pictures and Amblin Entertainment bought the rights to the novel by Michael Crichton before it was even published.'
].join(' ')

export default class MovieProfile extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      watchlist: true
    };

    this.toggleWatchList = this.toggleWatchList.bind(this);
  }

  toggleWatchList() {
    this.setState({watchlist: !this.state.watchlist})
  }

  render() {
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
                <Card>
                  <Image src='https://lh3.googleusercontent.com/UzPAxi3D59OAIPn7ax-Le3Hh0jOcnMAlbqE-P6626qvdtJE2VEt1d1dJSi1h4AID0fwM=w200-h300' />
                  <Card.Content header={title} />
                  <Card.Content> {rating} </Card.Content>
                  {watchlist}
                </Card>
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

