import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export const loadUser = async () => {
  const user = await localStorage.getItem('PEDEA-AdminSystem')
  return user
}

export const RoutesPrivate = ({ children, ...rest }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadUser().then(user => setUser(user))
  }, [])

  console.log(user)

  if (!user) {
    return <Navigate to="/login" />
  }

  return user ? children : <Navigate to="/login" />
}

RoutesPrivate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}
