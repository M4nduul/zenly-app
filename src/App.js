import React, { useEffect, useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './index.css'
import Homepage from './components/Homepage'
import Profile from './components/Profile'
import FriendRequests from './components/FriendRequests'
import Login from './components/Login'
import { Switch, Route, useHistory } from "react-router-dom";
import { auth, firestore } from './components/base'

const App = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser({})
        history.replace('/login')
        setIsLoading(false)
        return
      }

      const doc = await firestore.doc(`users/${user.uid}`).get()
      setUser({
        uid: user.uid,
        phone: user.phoneNumber,
        ...(doc.data() || {}),
      })

      // if (!user.username) {
        // history.replace('/profile')
      // }

      setIsLoading(false)

    })

    return () => unsubscribe()

  }, [history])

  if (isLoading) {
    return (
      <div className='container circle-cont flex'>
        {/* <header className='header indigo-text'> <h4>Loading...</h4> </header> */}
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
        </div>
      </div>
    </div>
    )
  } else {
  return (
    <Switch>
      <Route exact path='/'>
        <Homepage user={user} />
      </Route>
      <Route path='/friendreq'>
        <FriendRequests />
      </Route>
      <Route path='/login'>
        <Login user={user} />
      </Route>
      <Route path='/profile'>
        <Profile user={user} setUser={setUser} />
      </Route>
    </Switch>
  )

  }
}
export default App;