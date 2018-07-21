import React from 'react';
import { Image, List, Label, Icon } from 'semantic-ui-react';

export default class WatchListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: true
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  toggleFavorite() {
    this.setState({favorite: !this.state.favorite});
  }

  removeItem() {
    this.props.remove(this.props.movieName);
  }

  render() {

    return (
      <List.Item>
        <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "heart" : "heart outline"}/>
        <List.Icon color="red" onClick={ () => this.removeItem() } name="eye slash outline" />
        <List.Content onClick = {e => {this.props.searchByMovie(e.target.innerHTML); } } >{this.props.movieName}</List.Content>
      </List.Item>
    );
  }

};