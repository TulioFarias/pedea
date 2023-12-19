import React from 'react'
import { Link } from 'react-router-dom'

import IconLogin from '../../assets/icons/iconlogin.png'
import '../../sass/LoginSystem/containerLogin.scss'
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
