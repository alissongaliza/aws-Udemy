import React, { useState, useEffect } from "react";
import "./App.css";
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { Amplify } from "aws-sdk";
import { Auth, Hub } from 'aws-amplify'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import MarketPage from './pages/MarketPage'
import NavBar from './components/Navbar'

export const UserContext = React.createContext()

const App = () => {

  const [state, setState] = useState({ user: null })


  const getUserData = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    setState(prev => ({ ...prev, user: authUser ? authUser : null }))
  }

  useEffect(() => {
    Hub.listen('auth', data => {
      const { payload } = data
      onAuthEvent(payload)
      console.log("A new auth event has happened: ", data.payload.data.username + " has " + data.payload.event);
    })
    getUserData()
  }, [])

  const onAuthEvent = payload => {
    switch (payload.event) {
      case 'signin':
        console.log('signed in');
        getUserData()
        break;
      case 'signUp':
        console.log('signUp');
        // setState(prev => ({ ...prev, user: null }))
        break;
      case 'signOut':
        console.log('signOut');
        setState(prev => ({ ...prev, user: null }))
        break;
      default:
        return
    }
  }

  const handleSignout = async () => {
    try {
      Auth.signOut()
    }
    catch (e) {
      console.error('Error signing out user', e)
    }
  }



  return state.user ? (
    <UserContext.Provider value={{ user: state.user }}>
      <Router>
        <>
          <NavBar user={state.user} handleSignout={handleSignout} />
          <div className='app-container' >
            <Route exact path='/' component={HomePage} />
            <Route path='/profile' component={ProfilePage} />
            <Route path='/markets/:marketId' component={({ match: { params: { marketId } } }) => <MarketPage marketId={marketId} />} />
          </div>
        </>
      </Router>
    </UserContext.Provider >
  ) : <Authenticator theme={theme} />;
}

const theme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button
  }
}

// export default Authenticator(App, true, [], null, theme);
export default App;
