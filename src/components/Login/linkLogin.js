import React from 'react'
import { Link } from 'react-router-dom'

import IconLogin from '../../assets/icons/iconlogin.png'

function ContainerLogin() {
  return (
    <>
      <div className="container-login">
        <Link className="linkLogin" to="/login">
          <img src={IconLogin} />
        </Link>
      </div>
    </>
  )
}

export default ContainerLogin
