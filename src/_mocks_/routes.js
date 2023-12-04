import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import ContainerHome from '../features/ContainerWelcome'
import LoginSystem from '../features/Login/login'

function NewRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={ContainerHome} path="/"></Route>
        <Route element={LoginSystem} path="/login"></Route>
      </Routes>
    </Router>
  )
}

export default NewRoutes
