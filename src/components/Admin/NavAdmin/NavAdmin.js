import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import React from 'react'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'

import '../../../sass/admin/navAdmin.scss'
import PEDEA from '../../../assets/img/pedea-logo.png'
import ButtonSystem from './NavButtonsSystem'

function NavAdmin({ handleOptionChange }) {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = value => {
    i18n.changeLanguage(value)
  }

  return (
    <div className="bodyNav">
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

      <hr />
      <ButtonSystem handleOptionChange={handleOptionChange} />

      <hr />
      <div className="containerNavFooter">
        <p>
          {t(
            'Informações do Sistema © 2024 Governo do Estado do Ceará. Todos os direitos reservados.'
          )}
        </p>
      </div>
      <hr />
    </div>
  )
}

NavAdmin.propTypes = {
  handleOptionChange: PropTypes.func.isRequired
}

export default NavAdmin
