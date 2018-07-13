import React from 'react';

const Title = function(props) {
  if (props.isLoggedIn !== true) {
  return (<div>
    <span>    	
    <img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjilbTaqJrcAhUorVQKHY1rAO0QjRx6BAgBEAU&url=http%3A%2F%2Fwww.way2ads.co%2Fcoloring-worksheet%2Fmovie-reel-drawing.html&psig=AOvVaw13yOyrh61aYMjwfmz9vVGb&ust=1531510812967632" className="logo"/>
    </span>  
    <span>  
    <h1 className="title" >GoodFlix</h1>
    </span>
    <span> 
    <h4 className="subtitle" >Find your next movie</h4>
    </span>  
  </div>)
  } else {
  	return (<div>
  	<span>  	
    <img src="https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjilbTaqJrcAhUorVQKHY1rAO0QjRx6BAgBEAU&url=http%3A%2F%2Fwww.way2ads.co%2Fcoloring-worksheet%2Fmovie-reel-drawing.html&psig=AOvVaw13yOyrh61aYMjwfmz9vVGb&ust=1531510812967632" className="logo"/>
    </span> 
    <span>   
    <h1 className="title">Welcome</h1>
    </span> 
    <span>   
    <h4 className="subtitle">{props.userName}</h4>
    </span>  
  </div>)
  }
}

export default Title;