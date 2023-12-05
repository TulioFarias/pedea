import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import ContainerHome from '../features/ContainerWelcome'
import Login from '../features/Login'

function NewRoutes() {
  return (
    <Router>
      <Routes>
        <Route Component={ContainerHome} path="/"></Route>
        <Route Component={Login} path="/login"></Route>
      </Routes>
    </Router>
  )
}

export default NewRoutes
