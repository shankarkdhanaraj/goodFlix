import React from 'react';
import { Image, List, Divider } from 'semantic-ui-react';
import FollowingListItem from './FollowingListItem.jsx';

export default class FollowingList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list
    };

    this.removeFromWatchlist = this.removeFromWatchlist.bind(this);
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
    debugger;
    const listItems = this.props.list.map( (user, index) => {
      return (<FollowingListItem key={index} userName={user.userName} />);
    });
    return (
      <div>
        <h3>{this.props.listTitle}</h3>
        <List celled>
          {listItems}
        </List>
      </div>
    );
  }
};
