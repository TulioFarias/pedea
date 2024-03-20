import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
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
        <h5>{t('Menu de navegação')}</h5>
      </div>

      <Nav defaultActiveKey="" className="NavOptionsLinks">
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/admin"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Home')
            }}
            className={`links-btnsNav ${
              activeButton === 'Home' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <HomeRoundedIcon />
            {t('Home')}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            eventKey="link-1"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link1')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link1' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <PublicRoundedIcon />
            Link 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-2"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link2')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link2' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-3"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link3')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link3' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 3
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-4"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link4')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link4' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 4
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-5"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link5')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link5' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 5
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-6"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link6')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link6' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 6
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/link-7"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Link7')
            }}
            className={`links-btnsNav ${
              activeButton === 'Link7' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <AppsRoundedIcon />
            Link 7
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="OptionsItems">
          <Nav.Link
            href="/Configurações"
            onClick={e => {
              e.preventDefault()
              handleButtonClick('Configurações')
            }}
            className={`links-btnsNav ${
              activeButton === 'Configurações' ? 'nav-link active' : 'nav-link'
            }`}
          >
            <SettingsRoundedIcon />
            {t('Configurações')}
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

ButtonSystem.propTypes = {
  handleOptionChange: PropTypes.func.isRequired
}

export default ButtonSystem
