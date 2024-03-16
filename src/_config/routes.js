import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, useLocation } from 'react-router-dom'

import AnimatedRoutes from '../components/AnimatesRoutes/Animate'
import store from '../utils/redux/store'

function NewRoutes() {
  return (
    <Provider store={store}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </Provider>
  )
}

export default NewRoutes
