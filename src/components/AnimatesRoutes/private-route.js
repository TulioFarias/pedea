import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Admin from '../../containers/Admin'
import api from '../../services/api'
import { logout } from '../../utils/redux/user/actions'

export const Private = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData
  const userStorage = localStorage.getItem('pedea-admin: user')

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.filter(user => user.id === loggedInUserId)

        if (loggedInUser) {
          setUser(loggedInUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [loggedInUserId])

  if (!userStorage) {
    return <Navigate to="/login" />
  }

  return <Admin />
}
