import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from '../containers/Home'
import Admin from '../features/Admin'
import Login from '../features/Login'

function NewRoutes() {
  return (
    <Router>
      <Routes>
        <Route Component={Home} path="/"></Route>
        <Route Component={Login} path="/login"></Route>
        <Route Component={Admin} path="/Admin"></Route>
      </Routes>
    </Router>
  )
}

export default NewRoutes
