import React, { Component } from 'react';
import { Input, Menu } from 'semantic-ui-react';

export default class MenuExampleSecondary extends Component {
  constructor(){
    super()
  this.state = { activeItem: 'home' }
  this.handleItemClick = this.handleItemClick.bind(this);
}

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Item
          name='Watchers'
          active={activeItem === 'Watchers'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='My Movies'
          active={activeItem === 'My Movies'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search for your favorite movies..' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
};
