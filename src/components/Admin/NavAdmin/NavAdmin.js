import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import { Container } from 'react-bootstrap'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'

import '../../../sass/admin/navAdmin.scss'
import PEDEA from '../../../assets/img/pedea-logo.png'
import ButtonSystem from './NavButtonsSystem'

function NavAdmin({ handleOptionChange, sidebarOpen }) {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = value => {
    i18n.changeLanguage(value)
  }

  return (
    <Container
      fluid
      className={`bodyNav ${sidebarOpen ? 'bodyNav-expanded' : ''}`}
    >
      <div className="containerDivsLanguage">
        <Tooltip title="PT" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('pt-BR')}
          >
            <Flag country="BR" />
          </button>
        </Tooltip>

        <Tooltip title="EN" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('en')}
          >
            <Flag country="US" />
          </button>
        </Tooltip>

        <Tooltip title="ES" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('es')}
          >
            <Flag country="ES" />
          </button>
        </Tooltip>
      </div>

      <div className="container divImg">
        <img src={PEDEA} alt="PEDEA Logo" className="imgPEDEA" />
      </div>

      <hr className="hrNavOptionsOne" />
      <ButtonSystem handleOptionChange={handleOptionChange} />

      <hr className="hrNavOptionsTwo" />
      <div className="containerNavFooter">
        <p>
          {t(
            'Informações do Sistema © 2024 Governo do Estado do Ceará. Todos os direitos reservados.'
          )}
        </p>
      </div>
    </Container>
  )
}

NavAdmin.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired
}

export default NavAdmin
