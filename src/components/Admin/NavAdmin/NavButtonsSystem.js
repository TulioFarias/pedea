import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'

import '../../../sass/admin/navAdmin.scss'

function ButtonSystem({ handleOptionChange }) {
  const [activeButton, setActiveButton] = useState('Home')
  const handleButtonClick = option => {
    handleOptionChange(option)
    setActiveButton(option)
  }

  console.log(activeButton)
  return (
    <div className="ContainerButtonsSystem">
      <div className="titleText">
        <p>Menu de navegação</p>
      </div>

      <div className="containerLinks">
        <Nav variant="tabs" defaultActiveKey="" className="NavOptionsLinks">
          <Nav.Item className="OptionsItems">
            <Nav.Link
              href="/admin"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Home')
              }}
              className={
                activeButton === 'Home' ? 'nav-link active' : 'nav-link'
              }
            >
              <HomeRoundedIcon />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Geoserver')
              }}
              href="/admin/geoserver"
              className={
                activeButton === 'Geoserver' ? 'nav-link active' : 'nav-link'
              }
            >
              <PublicRoundedIcon />
              Geoserver
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  )
}

ButtonSystem.propTypes = {
  handleOptionChange: PropTypes.func.isRequired
}

export default ButtonSystem
