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
        image:'https://preview.redd.it/vwoj1l96lsj41.png?auto=webp&s=61d96f7e45f00c1e8eefe374bd23de3f6974fbd8',
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
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <Switch>
        <Route exact path='/'>
          <Homepage user={user} setUser={setUser} />
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