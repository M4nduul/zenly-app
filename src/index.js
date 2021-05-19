import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import FriendRequests from './components/FriendRequests'

ReactDOM.render(
  <React.StrictMode>
    {/* <FriendRequests /> */}
    <Homepage />
    {/* <Profile /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
