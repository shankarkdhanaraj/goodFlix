import React from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';

export default class UsernamePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''

    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log(`${name} is ${value}`)
    this.setState({ [name]: value });
  }


  render() {

    return (
      <Form>
        <Form.Field>
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
          </div>
        </Form.Field>
        <Form.Field>
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
          </div>
        </Form.Field>
        <Button type='submit' onClick={ () => this.props.clickSubmit(this.state)} >Submit</Button>
      </Form>
    );
  }
};