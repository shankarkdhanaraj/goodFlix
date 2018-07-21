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

const Movie = (props) => (
	<div>
<Container>
 <Grid>
   <Grid.Row>
   		<Grid.Column width={8}>
 		<Card
        image={'https://ee.iva-api.com/api/Images/'+props.getMovie.images[0].FilePath+'/Redirect?subscription-Key=e55978e3a34543879fd13418397833d3'}
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
