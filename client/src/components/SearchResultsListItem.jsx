import React from 'react';
import { Image, List, Label, Icon } from 'semantic-ui-react';

export default class SearchResultsListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      favorite: true,
      id: this.props.movie.Source.Id,
      language: this.props.movie.Source.OriginalLanguage,
      title: this.props.movie.Source.OriginalTitle,
      year: this.props.movie.Source.Year,

      movie: this.props.movie.movie,
      stars: this.props.movie.stars,
      review: this.props.movie.review
    };
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.renderLoggedIn = this.renderLoggedIn.bind(this);
    this.renderLoggedOut = this.renderLoggedOut.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      favorite: true,
      id: this.props.movie.Source.Id,
      language: this.props.movie.Source.OriginalLanguage,
      title: this.props.movie.Source.OriginalTitle,
      year: this.props.movie.Source.Year
    });
  }


  toggleFavorite() {
    this.setState({favorite: !this.state.favorite});
  }

  removeItem() {
    this.props.remove(this.props.movieName)
  }

  renderLoggedIn() {
    return (
      <List.Item>
        <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "heart" : "heart outline"}/>
        <List.Content onClick={ () => this.props.getClickedMovieInfo(this.props.movie.Source.OriginalTitle) } ><List.Icon name="film" /> <a>{this.props.movie.Source.OriginalTitle}</a></List.Content>
      </List.Item>
    );
  }

  renderLoggedOut() {
    return (
      <List.Item>
        <List.Content onClick={ () => this.props.getClickedMovieInfo(this.props.movie.Source.OriginalTitle) } ><List.Icon name="film" /> <a>{this.props.movie.Source.OriginalTitle}</a></List.Content>
      </List.Item>
    );
  }

  render() {

    if ( this.props.isLoggedIn ) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }

    // return (
    //   <List.Item>
    //     <List.Icon onClick={ () => this.toggleFavorite() } name={this.state.favorite === true ? "heart" : "heart outline"}/>
    //     <List.Icon onClick={ () => this.removeItem() } name='trash alternate outline' />
    //     <List.Content>{this.state.movie}   </List.Content>
    //   </List.Item>
    // );
  }

};