import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import PublicRoundedIcon from '@mui/icons-material/PublicRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import '../../../sass/admin/navAdmin.scss'
import { useTranslation } from 'react-i18next'
function ButtonSystem({ handleOptionChange }) {
  const { t } = useTranslation()
  const [activeButton, setActiveButton] = useState('Home')
  const handleButtonClick = option => {
    handleOptionChange(option)
    setActiveButton(option)
  }

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
              {t('Home')}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Geoserver')
              }}
              className={
                activeButton === 'Geoserver' ? 'nav-link active' : 'nav-link'
              }
            >
              <PublicRoundedIcon />
              Geoserver
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-2"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link2')
              }}
              className={
                activeButton === 'Link2' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 2
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-3"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link3')
              }}
              className={
                activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 3
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-3"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link3')
              }}
              className={
                activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 4
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-3"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link3')
              }}
              className={
                activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 5
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-3"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link3')
              }}
              className={
                activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 6
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/link-3"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Link3')
              }}
              className={
                activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
              }
            >
              Link 7
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              href="/configurações"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Configurações')
              }}
              className={
                activeButton === 'Configurações'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              <SettingsRoundedIcon />
              {t('Configurações')}
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
