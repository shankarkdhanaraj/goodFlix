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

// const description = ['Jurassic Park is an American science fiction media franchise centered on a disastrous attempt to create a theme park of cloned dinosaurs. ',
//   'The dinosaurs escape confinement and terrorize the human characters. It began in 1990 when Universal Pictures and Amblin Entertainment bought the rights to the novel by Michael Crichton before it was even published.'
// ].join(' ')

// const getImage(path){

//   $.ajax({
//       url: '/image', 
//       type:'GET',
//       data:{path:path},
//       success: (data) => {
//         console.log('data from get/image',data)
//       },
//       error: (err) => {
//         console.log('error in getimage', err);
//       }
//     });

// }

const Movie = (props) => (
	<div>
<Container>
 <Grid>
   <Grid.Row>
   		<Grid.Column width={8}>
 		<Card
    		image='https://lh3.googleusercontent.com/UzPAxi3D59OAIPn7ax-Le3Hh0jOcnMAlbqE-P6626qvdtJE2VEt1d1dJSi1h4AID0fwM=w200-h300'
    		header={props.getMovie.title}
    		extra={extra}/>
    	</Grid.Column>
   
  		<Grid.Column width={8}>
  			{props.getMovie.contributors.map(contributor =>
            <Item info={contributor}/>
         )
    } 
  		</Grid.Column>
 </Grid.Row>

<Grid.Row>
	      REVIEWS:<Rating icon='heart' defaultRating={(props.getMovie.ivaRating)*0.05} maxRating={5} />

</Grid.Row>

<Grid.Row>
	
	<Grid.Column width={8}>
		<Card>
    		<Card.Content header='About' />
    		<Card.Content description= {props.getMovie.descriptions[1].Description} />
    		<Card.Content extra>
    		</Card.Content>
  		</Card>

	</Grid.Column>

	<Grid.Column width={4}>
	<Comments/>
	</Grid.Column>

  </Grid.Row>
 </Grid>
 </Container>
</div>
)



export default Movie
