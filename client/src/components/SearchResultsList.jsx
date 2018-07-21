import React from 'react';
import { Image, List, Divider } from 'semantic-ui-react';
import SearchResultsListItem from './SearchResultsListItem.jsx';

export default class SearchResultsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list
    };

    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ list: this.props.list });
  }

  removeFromWatchlist(item) {
    let list = this.state.list.slice(0);
    let position = list.indexOf(item);
    if ( position !== -1 ) {
      list.splice(position, 1);
      this.setState({list: list});
    }
  }

  render() {
    const listItems = this.props.list.map( (item, index) => {
      return (<SearchResultsListItem key={index} movie={item} remove={this.removeFromWatchlist} isLoggedIn={this.props.isLoggedIn} userName={this.props.userName} getClickedMovieInfo={this.props.getClickedMovieInfo}/>);
    });
    return (
      <div>
        <h3>Search Results</h3>
        <List celled>
          {listItems}
        </List>
      </div>
    );
  }
};