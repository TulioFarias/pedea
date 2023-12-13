import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutUser } from '../../utils/redux/user/actions'
function AdminSystem() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const voltar = () => {
    dispatch(logoutUser())

    navigate('/login')
  }
  return (
    <>
      <div>
        <h1>Aqui sera o dashbord</h1>

        <button onClick={voltar}>Sair</button>
      </div>
    </>
  )
}

export default AdminSystem
