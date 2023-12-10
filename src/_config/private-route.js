import PropTypes from 'prop-types'
import React from 'react'
import { Navigate, Route } from 'react-router-dom'

import Admin from '../features/Admin'
import { useUser } from '../services/auth'

export function PrivateRoute({ element, ...rest }) {
  const { userData } = useUser()
  console.log('userData:', userData)

  if (!userData) {
    return <Navigate to="/login" />
  }
  return <Route {...rest} element={<Admin />} />
}

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired
}
