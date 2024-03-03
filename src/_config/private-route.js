import React from 'react'
import { Navigate } from 'react-router-dom'

import Admin from '../containers/Admin'

export const Private = () => {
  const user = localStorage.getItem('pedea-admin: user')

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Admin />
}

export const PrivateRecoverPass = () => {}
