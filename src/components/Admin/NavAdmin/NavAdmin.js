import React, { useState } from 'react'

import '../../../sass/admin/navAdmin.scss'
import PEDEA from '../../../assets/img/pedea-logo.png'
import ButtonSystem from './NavButtonsSystem'

function NavAdmin() {
  const [showNav, setShowNav] = useState(false)

  const toggleNav = () => {
    setShowNav(!showNav)
  }
  return (
    <div className="bodyNav">
      <div className="divImg">
        <img src={PEDEA} />
      </div>

      <hr />
      <ButtonSystem />
      <hr />
      <div className="containerNavFooter">
        <p>
          Informações do Sistema © 2024 Governo do Estado do Ceará. Todos os
          direitos reservados.
        </p>
      </div>
    </div>
  )
}

export default NavAdmin
