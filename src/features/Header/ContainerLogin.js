import React from 'react'

import '../../sass/LoginHeader/ContainerLogin.scss'
import IconLogin from '../../assets/icons/icon-login.png'

export const ContainerLogin = () => {
  return (
    <div className="container-login">
      <img src={IconLogin} />
      <p>
        Ola, seja bem-vindo(a), realize seu <a className="links-login">Login</a>{' '}
        ou faça seu <a className="links-login">Cadastro</a>
      </p>
    </div>
  )
}
