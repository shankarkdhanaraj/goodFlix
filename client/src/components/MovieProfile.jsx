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

  }


  render() {
    return (
      <div>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card
                  image='https://lh3.googleusercontent.com/UzPAxi3D59OAIPn7ax-Le3Hh0jOcnMAlbqE-P6626qvdtJE2VEt1d1dJSi1h4AID0fwM=w200-h300'
                  header='Jurassic Park'
                  extra={extra}/>
              </Grid.Column>
              <Grid.Column width={8}>
                <Item/>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              REVIEWS:<Rating icon='heart' defaultRating={3} maxRating={5} />
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Card.Content header='About' />
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

