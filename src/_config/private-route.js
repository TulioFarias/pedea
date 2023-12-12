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
    const fetchUser = async () => {
      try {
        const user = await loadUser()
        setUser(prevUser => ({ ...prevUser, ...user }))
        console.log('User state after setting:', user)
      } catch (error) {
        console.error('Error loading user:', error)
        setUser(null)
      }
    }

    fetchUser()
  }, [])

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

RoutesPrivate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}
