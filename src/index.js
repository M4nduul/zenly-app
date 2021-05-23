import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import FriendRequests from './components/FriendRequests'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/friendreq'>
          <FriendRequests />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
