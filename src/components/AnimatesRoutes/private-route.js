import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Admin from '../../containers/Admin'
import api from '../../services/api'

export const Private = () => {
  const userStorage = localStorage.getItem('pedea-admin: user')

  if (!userStorage) {
    return <Navigate to="/login" />
  }

  return <Admin />
}
