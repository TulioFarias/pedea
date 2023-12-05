import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import ContainerHome from '../features/ContainerWelcome'

function NewRoutes() {
  return (
    <Router>
      <Routes>
        <Route Component={ContainerHome} path="/"></Route>
      </Routes>
    </Router>
  )
}

export default NewRoutes
