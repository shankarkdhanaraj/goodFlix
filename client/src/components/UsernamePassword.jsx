import React from 'react';

export default class UsernamePassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form class="ui equal width form">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" name="username" placeholder="Username" />
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>
        <button class="ui button" type="submit">Submit</button>
      </form>
    );
  }
};