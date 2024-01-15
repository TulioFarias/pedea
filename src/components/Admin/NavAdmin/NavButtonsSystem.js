import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import PropTypes from 'prop-types'
import React from 'react'
import Nav from 'react-bootstrap/Nav'

import '../../../sass/admin/navAdmin.scss'

function ButtonSystem({ handleOptionChange }) {
  const handleButtonClick = option => {
    handleOptionChange(option)
  }
  return (
    <div className="ContainerButtonsSystem">
      <div className="titleText">
        <p>Menu de navegação</p>
      </div>

      <div className="containerLinks">
        <Nav variant="tabs" defaultActiveKey="" className="NavOptionsLinks">
          <Nav.Item className="OptionsItems">
            <Nav.Link href="/admin" onClick={() => handleButtonClick('Home')}>
              <HomeRoundedIcon />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={() => handleButtonClick('Geoserver')}
              href="/admin/geoserver"
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
