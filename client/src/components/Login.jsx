import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import UsernamePassword from './UsernamePassword.jsx';

export default class Login extends React.Component {
 constructor(props) {
   super(props);
   this.login = this.login.bind(this);
   this.gotoSignup = this.gotoSignup.bind(this);
 }

<<<<<<< HEAD
  login(userPassword) {
    let headers = new Headers();
    let params = {
      username: userPassword.username,
      password: userPassword.password
    };
    headers.append('Content-Type', 'application/json');
    let options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default',
      credentials: 'include'
    };


    let esc = encodeURIComponent;
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&');

    // let url = new URL(`http://localhost:3000/user/home`);
    // let params = {
    //   username: userPassword.username,
    //   password: userPassword.password
    // };
    // url.search = new URLSearchParams(params)
    fetch('/user/home/?' + query, options)
      .then( (response) => response.text() )
      .then( (responseTxt) => {
        if ( responseTxt === `0` ) {
          // console.log('Session id is ...', document.cookie);
          return document.cookie;
        } else if ( responseTxt === `1` ) { //user doesn't exist
          throw new Error(`User doesn't exist`);
        } else if ( responseTxt === `2` ) {
          throw new Error(`username and password doesn't match`);
        } else {
          throw new Error('Unknow error');
        }
      })
      .then( (sessionId) => {
        this.props.loginUser(params.username, sessionId);
      })
      .catch( (err) => console.log('Error when logging in...', err.message));
  }
=======
 login(userPassword) {
   let headers = new Headers();
   let params = {
     username: userPassword.username,
     password: userPassword.password
   };
   headers.append('Content-Type', 'application/json');
   let options = {
     method: 'GET',
     headers: headers,
     mode: 'cors',
     cache: 'default',
     credentials: 'include'
   };

>>>>>>> DB helper function; changes route for sign in logout

   let esc = encodeURIComponent;
   let query = Object.keys(params)
                .map(k => esc(k) + '=' + esc(params[k]))
                .join('&');

   // let url = new URL(`http://localhost:3000/user/home`);
   // let params = {
   //   username: userPassword.username,
   //   password: userPassword.password
   // };
   // url.search = new URLSearchParams(params)
   fetch('/user/home/?' + query, options)
     .then( (response) => response.text() )
     .then( (responseTxt) => {
       if ( responseTxt === `0` ) {
         // console.log('Session id is ...', document.cookie);
         return document.cookie;
       } else if ( responseTxt === `1` ) { //user doesn't exist
         throw new Error('User doesn\'t exist');
       } else if ( responseTxt === `2` ) {
         throw new Error('username and password doesn\'t match');
       } else {
         throw new Error('Unknow error');
       }
     })
     .then( (sessionId) => {
       this.props.loginUser(params.username, sessionId);
     })
     .catch( (err) => console.log('Error when logging in...', err.message));
 }

 gotoSignup() {
   this.props.changeToSignup();
 }

 render() {

   return (
     <Grid>
       <Grid.Row>
         <Grid.Column>
           <h3>Login</h3>
         </Grid.Column>
       </Grid.Row>
       <Grid.Row>
         <Grid.Column>
           <UsernamePassword clickSubmit={this.login}/>
         </Grid.Column>
       </Grid.Row>
       <Grid.Row>
         <Grid.Column>
           <div>No account? <Label as='a' basic onClick={ this.gotoSignup }> Sign up </Label></div>
         </Grid.Column>
       </Grid.Row>
     </Grid>
   );
 }
};
Message Input

Message #rpt07-hello-world