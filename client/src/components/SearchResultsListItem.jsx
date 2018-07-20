import React from 'react';
import { Image, List, Label, Icon } from 'semantic-ui-react';

export default class SearchResultsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: true,
      movie: this.props.review.movie,
      stars: this.props.review.stars,
      review: this.props.review.review
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  toggleFavorite() {
    this.setState({favorite: !this.state.favorite});
  }

  removeItem() {
    this.props.remove(this.props.movieName)
  }

  render() {

    return (
      <List.Item>
        <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "heart" : "heart outline"}/>
        <List.Icon onClick={ () => this.removeItem() } name='trash alternate outline' />
        <List.Content>{this.state.movie}   </List.Content>
      </List.Item>
    );
  }

};