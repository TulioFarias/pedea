import AppsRoundedIcon from '@mui/icons-material/AppsRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import HttpsRoundedIcon from '@mui/icons-material/HttpsRounded'
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Nav from 'react-bootstrap/Nav'
import '../../../sass/admin/NavAdmin/navAdmin.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded'

import api from '../../../services/api'

function ButtonSystem({ handleOptionChange, setActiveButton, activeButton }) {
  const { t } = useTranslation()

  const [user, setUser] = useState([])
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.find(user => user.id === loggedInUserId)

        if (loggedInUser) {
          setUser(loggedInUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [loggedInUserId])

  const { admin } = user

  const handleButtonClick = option => {
    handleOptionChange(option)
    setActiveButton(option)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 74 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="ContainerButtonsSystem"
    >
      <div className="titleText">
        <h5>{t('Menu de navegação')}</h5>
      </div>

      <Nav defaultActiveKey="" className="NavOptionsLinks">
        <Nav.Item className="OptionsItems">
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}>
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
          </motion.div>
        </Nav.Item>

        <Nav.Item className="OptionsItems">
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}>
            <Nav.Link
              href="/Rotulos Bilingue"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Rotulos Bilingue')
              }}
              className={`links-btnsNav ${
                activeButton === 'Rotulos Bilingue' ? 'nav-link active' : 'nav-link'
              }`}
              disabled={!admin}
            >
              {admin ? (
                <>
                  <AppsRoundedIcon />
                 {t("Rótulos Bilíngue")}
                </>
              ) : (
                <div className="disableLink">
                  <HttpsRoundedIcon />
                  <p>Acesso restrito</p>
                </div>
              )}
            </Nav.Link>
          </motion.div>
        </Nav.Item>

        <Nav.Item className="OptionsItems">
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}>
            <Nav.Link
              href="/DataExplorer"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('DataExplorer')
              }}
              className={`links-btnsNav ${
                activeButton === 'DataExplorer' ? 'nav-link active' : 'nav-link'
              }`}
              disabled={!admin}
            >
              {admin ? (
                <>
                  <TravelExploreRoundedIcon />
                  {t("Explorador de Dados")}
                </>
              ) : (
                <div className="disableLink">
                  <HttpsRoundedIcon />
                  <p>Acesso restrito</p>
                </div>
              )}
            </Nav.Link>
          </motion.div>
        </Nav.Item>

        <Nav.Item className="OptionsItems">
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.5 }}>
            <Nav.Link
              href="/FAQ"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('FAQ')
              }}
              className={`links-btnsNav ${
                activeButton === 'FAQ' ? 'nav-link active' : 'nav-link'
              }`}
              disabled={!admin}
            >
              {admin ? (
                <>
                  <QuestionAnswerRoundedIcon />
                  FAQ
                </>
              ) : (
                <div className="disableLink">
                  <HttpsRoundedIcon />
                  <p>Acesso restrito</p>
                </div>
              )}
            </Nav.Link>
          </motion.div>
        </Nav.Item>

        <Nav.Item className="OptionsItems">
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 1 }}>
            <Nav.Link
              href="/Configurações"
              onClick={e => {
                e.preventDefault()
                handleButtonClick('Configurações')
              }}
              className={`links-btnsNav ${
                activeButton === 'Configurações'
                  ? 'nav-link active'
                  : 'nav-link'
              }`}
            >
              <SettingsRoundedIcon />
              {t('Configurações')}
            </Nav.Link>
          </motion.div>
        </Nav.Item>
      </Nav>
    </motion.div>
  )
}

ButtonSystem.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  setActiveButton: PropTypes.func.isRequired,
  activeButton: PropTypes.string.isRequired
}

export default ButtonSystem
