import React from 'react';
import { Image, List, Label, Icon, Rating } from 'semantic-ui-react';
import $ from 'jquery';

export default class TopMoviesListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: true
    };
  }


  render() {

    return (
      <List.Item>
        <Rating defaultRating={3} maxRating={5} disabled />
        <List.Content as='a' onClick={ () => alert(`clicked ${this.props.movieName}`)}>{this.props.movieName}   </List.Content>
      </List.Item>
    );
  }

};