import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import FriendRequests from './components/FriendRequests'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { auth } from './components/base'

const App = () => {
  const [user, setUser] = useState(null)
  const history = useHistory();

  

  
  return(
    <Router>
      <Switch>
        <Route exact path='/'>
          <Homepage />
        </Route>
        <Route path='/friendreq'>
          <FriendRequests />
        </Route>
        <Route path='/login'>
          <Login user={ user }/>
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  )
  
}

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
