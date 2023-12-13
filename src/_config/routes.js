import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/Home'
import Admin from '../features/Admin'
import Login from '../features/Login'
import Register from '../features/register'
import store from '../utils/redux/store'

function NewRoutes() {
  return (
    <Provider store={store}>
      <Auth0Provider
        domain="dev-kqnlpqmt6s2mmg8e.us.auth0.com"
        clientId="zNZKpI6Ua9YGDwjeunMqwuG3KuBO5Nrs"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Router>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/cadastro" />
            <Route element={<Admin />} path="/admin" />
          </Routes>
        </Router>
      </Auth0Provider>
    </Provider>
  )
}

export default NewRoutes
