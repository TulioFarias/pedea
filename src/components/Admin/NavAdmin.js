import React from 'react'

import '../../sass/admin/navAdmin.scss'
import PEDEA from '../../assets/img/pedea-logo.png'

export const NavAdmin = () => {
  return (
    <div className="bodyNav">
      <div className="divImg">
        <img src={PEDEA} />
      </div>

      <hr></hr>
    </div>
  )
}
