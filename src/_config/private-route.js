import React from 'react'
import { Navigate } from 'react-router-dom'

import Admin from '../containers/Admin'

export const Private = () => {
  const user = localStorage.getItem('PEDEA-AdminSystem')

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Admin />
}
