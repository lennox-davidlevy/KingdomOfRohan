import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import GlobalSearch from './components/GlobalSearch.jsx';
import Profile_Search from './components/Profile_Search.jsx';
import TreeMode from './components/Tree/TreeMode.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

import SchedulePage from './components/SchedulePage.jsx';

import WN from "./components/watchNow.jsx";

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: 'global',
      loginError: false
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.getAuthentication = this.getAuthentication.bind(this);
  }


  componentDidMount() {
    this.getAuthentication();
  }




  getAuthentication() {

    axios.get('/authenticate')
    .then(resp => {

      if (resp.data.status) {

        this.setState({
          loggedIn: true,
          user: resp.data.user
        });
      }
    })
    .catch(err => console.log('bad response'));
  }

  handleSignUp(username, password) {
    console.log('signing up with: ', username, password);
    axios.post('/signup', { username: username, password: password })
      .then((response) => {
        console.log('signed up successfully!');
        this.setState({
          loggedIn: true,
          user: response.data.username,
        });
        console.log('Current logged in User: ', this.state.user, 'bool', this.state.loggedIn)
      })
      .catch((err) => {
        console.error('something went wrong on signup: ', err);
      });
  }

  handleLogin(username, password) {

    axios.post('/login', { username: username, password: password })
      .then((response) => {

        if (response.data.username) {

          this.setState({
            loggedIn: true,
            user: response.data.username,
            loginError: false
          });
        } else {
          this.setState({
            loginError: true
          })
        }
      })
      .catch((err) => {
        console.log('something went wrong: ', err)
      })
  }

  handleLogout() {
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/global" />} />


            <Route path="/schedule" render={() => <SchedulePage user={this.state.user}/>} />

            <Route path="/global" render={() => { return <div><GlobalSearch user={this.state.user} /> </div>}} />

            <Route path="/profile" render={() => (
              this.state.loggedIn ? (
                <Profile_Search user={this.state.user} />
              ) : (
                <Redirect to="/login" />
              )
            )} />
            <Route path="/login" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/profile" />
              ) : (
                <Login signup={this.handleSignUp} login={this.handleLogin} loginError={this.state.loginError} />
              )
            )} />
            <Route path="/signup" render={() => (
              this.state.loggedIn ? (
                <Redirect to="/profile" />
              ) : (
                <Signup signup={this.handleSignUp} login={this.handleLogin} />))} />
            <Route path="/logout" render={() => <Redirect to="/login" />} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
