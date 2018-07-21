import React from 'react';
import {Header, Image} from 'semantic-ui-react';

const Title = function(props) {
  if (props.isLoggedIn !== true) {
  return (<div>
    <Header as='h1' width='50px'>
      <Image src="reel.png" size='large'/>
      GoodFlix ...find your next movie
    </Header>
  </div>)
  } else {
  	return (<div>
    <Header as='h1' onClick={ () => props.getUserInfo()}>
      <Image src="reel.png" size='large'/>
      Welcome, {props.userName}
    </Header>
  </div>)
  }
}

export default Title;