import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/Home'
import Admin from '../features/Admin'
import Login from '../features/Login'
import { UserProvider } from '../services/auth'
import { RoutesPrivate } from './private-route'

function NewRoutes() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Admin />} path="/admin" />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default NewRoutes
