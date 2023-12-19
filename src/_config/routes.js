import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Admin from '../components/Admin'
import Login from '../components/Login'
import Register from '../components/register'
import Home from '../containers/Home'
import store from '../utils/redux/store'
import { Private } from './private-route'

function NewRoutes() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/cadastro" />
            <Route element={<Private Admin={<Admin />} />} path="/admin" />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default NewRoutes
