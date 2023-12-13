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
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/cadastro" />
          <Route element={<Admin />} path="/admin" />
        </Routes>
      </Router>
    </Provider>
  )
}

export default NewRoutes
