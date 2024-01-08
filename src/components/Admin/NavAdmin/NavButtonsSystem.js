import React from 'react'

import '../../../sass/admin/navAdmin.scss'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

function ButtonSystem() {
  return (
    <div className="ContainerButtonsSystem">
      <button className="NavBtns">
        <HomeRoundedIcon />
        Home
      </button>
      <button className="NavBtns">Option</button>
      <button className="NavBtns">Option</button>
      <button className="NavBtns">Option</button>
    </div>
  )
}

export default ButtonSystem
