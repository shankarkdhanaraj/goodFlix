import React from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';

export default class UsernamePassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Form>
        <Form.Field>
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="Username" />
          </div>
        </Form.Field>
        <Form.Field>
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </Form.Field>
        <Button type='submit' onClick={ () =>this.props.onSubmit()}>Submit</Button>
      </Form>
    );
  }
};