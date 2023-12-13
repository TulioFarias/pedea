import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/Home'
import Admin from '../features/Admin'
import Login from '../features/Login'
import Register from '../features/register'
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
