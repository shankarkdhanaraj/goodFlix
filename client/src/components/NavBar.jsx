import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';

export default class MenuExampleSecondary extends Component {
  constructor(){
    super()
  this.state = { activeItem: 'Home' }
  this.handleItemClick = this.handleItemClick.bind(this);
}

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
    this.props.changePage(name);
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
            <Menu.Item>
              <Input icon='search' placeholder='Search for movies...' />
            </Menu.Item>
{/*            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />;
*/}         {logout}
          </Menu.Menu>
        </Menu> ;
    } else {
      navBar =
        <Menu secondary pointing>
          <Menu.Item name='Home' active={activeItem === 'Home'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search for movies...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu> ;
    }
    return navBar;
  }
};
