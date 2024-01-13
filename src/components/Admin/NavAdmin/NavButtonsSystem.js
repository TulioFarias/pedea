import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import '../../../sass/admin/navAdmin.scss'
import { useTranslation } from 'react-i18next'

function ButtonSystem() {
  const { t } = useTranslation()

  return (
    <div className="ContainerButtonsSystem">
      <div className="titleText">
        <p>Menu de navegação</p>
      </div>
      <div className="containerButtons">
        <button className="NavBtns">Option 1</button>
        <button className="NavBtns">Option 2</button>
        <button className="NavBtns">Option 3</button>
        <button className="NavBtns">Option 4</button>
      </div>
    </div>
  )
}

export default ButtonSystem
