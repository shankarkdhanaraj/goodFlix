import React, { Component } from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';

export default class MenuExampleSecondary extends Component {
  constructor(){
    super()
  this.state = { activeItem: 'Home' ,
                 term : '' }
  this.handleItemClick = this.handleItemClick.bind(this);
  this.search = this.search.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.logout = this.logout.bind(this);
}

  handleItemClick(e, { name }) {
    if ( name === 'logout') {
      console.log('logout clicked');
      this.logout();
    } else {
      this.setState({ activeItem: name })
      this.props.changePage(name);
    }
  }

  logout() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    };

    //let url = new URL('/logout');
    fetch('/logout', options)
      .then( (response) => {
        console.log('response is...', response.text());
        console.log('Session id after logout is ...', document.cookie);
        // return response.text();
        return document.cookie;
      })
      .catch( (err) => console.log('Unknown error when logging out...', err.message));


    this.props.logoutUser();
  }

  handleChange(e){
    this.setState({
      term:e.target.value
    })
  }

  search(){
    var searchterm = this.state.term;
    this.props.search(searchterm);
    this.setState({term: ''});
    this.props.displaySearchResults();
  }

  render() {
    const { activeItem } = this.state;
    let navBar;
    let home = <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />;
    let watchers = <Menu.Item name='Watchers' active={activeItem === 'Watchers'} onClick={this.handleItemClick} />;
    let myMovies = <Menu.Item name='My Movies' active={activeItem === 'My Movies'} onClick={this.handleItemClick} />;
    let logout = <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />;
    if ( this.props.isLoggedIn ) {
      navBar =
        <Menu secondary pointing>
{/*          <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Item name='Watchers' active={activeItem === 'Watchers'} onClick={this.handleItemClick} />
          <Menu.Item name='My Movies' active={activeItem === 'My Movies'} onClick={this.handleItemClick} />*/}
          {home}
          {watchers}
          {myMovies}
          <Menu.Menu position='right'>
          <Input type="text" value={this.state.term} onChange={this.handleChange}/>
          <Button onClick={this.search}>Go</Button>
{/*            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />;
*/}         {logout}
          </Menu.Menu>
        </Menu> ;
    } else {
      navBar =
        <Menu secondary pointing>
          <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
          <Input type="text" value={this.state.term} onChange={this.handleChange}/>
          <Button onClick={this.search}>Go</Button>
          </Menu.Menu>
        </Menu> ;
    }
    return navBar;
  }
};
