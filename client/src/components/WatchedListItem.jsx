import React from 'react';
import { Image, List, Label, Icon } from 'semantic-ui-react';

export default class WatchedListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: true
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    this.setState({favorite: !this.state.favorite});
  }

  render() {

    return (
      <List.Item>
        <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "heart" : "heart outline"}/>
        <List.Content>{this.props.movieName}   </List.Content>
      </List.Item>
    );
  }

};