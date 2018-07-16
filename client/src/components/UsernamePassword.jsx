import React from 'react';

export default class UsernamePassword extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <form className="ui equal width form">
        <div className="field">
          <div className="ui left icon input">
            <i className="user icon"></i>
            <input type="text" name="username" placeholder="Username" />
          </div>
        </div>
        <div className="field">
          <div className="ui left icon input">
            <i className="lock icon"></i>
            <input type="password" name="password" placeholder="Password" />
          </div>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    );
  }
};