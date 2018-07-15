import React from 'react';
import { Image, List, Label, Icon } from 'semantic-ui-react';

export default class FollowingListItem extends React.Component {

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
        <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "star" : "star outline"}/>
        <List.Content>{this.props.userName}   </List.Content>
      </List.Item>
    );
  }

};