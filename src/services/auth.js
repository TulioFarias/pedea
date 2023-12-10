import PropTypes from 'prop-types'
import React, { useState, useContext, createContext, useEffect } from 'react'

const userContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const putUserData = async userInfo => {
    setUserData(userInfo)

    await localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(userInfo))
  }

  const logout = async () => {
    await localStorage.removeItem('')
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('adminSystem-PEDEA')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  return (
    <userContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(userContext)

  if (!context) {
    throw new Error('Deu um errozinho!')
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
