import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PublicIcon from '@mui/icons-material/Public'
import React from 'react'
import '../../../sass/admin/navAdmin.scss'

function ButtonSystem() {
  return (
    <div className="ContainerButtonsSystem">
      <button className="NavBtns">
        <HomeRoundedIcon />
        Home
      </button>
      <button className="NavBtns">
        <PublicIcon /> Geoserver
      </button>
      <button className="NavBtns">Option</button>
      <button className="NavBtns">Option</button>
    </div>
  )
}

export default ButtonSystem
