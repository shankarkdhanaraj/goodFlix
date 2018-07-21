import React from 'react';
import { Image, List, Divider } from 'semantic-ui-react';
import WatchListItem from './WatchListItem.jsx';

export default class WatchList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list
    };

    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
  }

  removeFromWatchlist(item) {
    console.log('Item removal...', item);

    let headers = new Headers();
    let userMovie = {
      userName: this.props.userName,
      movie: item
    };
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'DELETE',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    };
    let esc = encodeURIComponent;
    let query = Object.keys(userMovie)
                 .map(k => esc(k) + '=' + esc(userMovie[k]))
                 .join('&');

    fetch('/user/watchlist?' + query, options)
      .then( (response) => response.text() )
      .then( (responseTxt) => {
        console.log('response from POST to /user/watchlist...', responseTxt);
        let list = this.state.list.slice(0);
        let position = list.indexOf(item);
        if ( position !== -1 ) {
          list.splice(position, 1);
          this.setState({list: list});
        }
      })
      .catch( (err) => console.log('Unknown error when removing from watchlist...', err.message));

  }

  render() {
    const listItems = this.state.list.map( (item, index) => {
      return (<WatchListItem search={this.props.search} key={index} movieName={item} remove={this.removeFromWatchlist} getMovie={this.getMovie} searchByMovie={this.props.searchByMovie}/>);
    });
    return (
      <div>
        <h3>Watch List</h3>
        <List celled>
          {listItems}
        </List>
      </div>
    );
  }
};
