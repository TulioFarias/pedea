import { useState, useEffect } from 'react'

const useAuth = () => {
  const [userData, setUserData] = useState(null)

  const putUserData = async userInfo => {
    setUserData(userInfo)

    await localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(userInfo))
  }

  const logout = async () => {
    setUserData(null)
    await localStorage.removeItem('PEDEA-AdminSystem')
  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('PEDEA-AdminSystem')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  return { userData, putUserData, logout }
}

export default useAuth
