import { Tooltip } from '@mui/material'
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Flag from 'react-flagkit'
import '../../sass/govHeader/GovHeader.scss'
import { useTranslation } from 'react-i18next'

// import * as yup from 'yup'

function GovHeader() {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = value => {
    i18n.changeLanguage(value)
  }

  return (
    <div className="d-flex justify-content-between my-custom-div bg-gray-header">
      <Navbar expand="sm" className="">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toogler"
        />

        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="custom-toogler-open"
        >
          <Nav className="mr-auto">
            <Nav.Link
              href="https://www.ceara.gov.br/"
              target="_blank"
              className="link-secondary link-opacity-50-hover links-color"
              rel="noreferrer"
            >
              {t('Portal do Governo')}
            </Nav.Link>

            <span className="custom-span">|</span>
            <Nav.Link
              href="https://cearatransparente.ce.gov.br/"
              target="_blank"
              className="link-secondary link-opacity-50-hover links-color"
              rel="noreferrer"
            >
              {t('Ceará Transparente')}
            </Nav.Link>

            <span className="custom-span">|</span>
            <Nav.Link
              href="https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR"
              target="_blank"
              className="link-secondary link-opacity-50-hover links-color"
              rel="noreferrer"
            >
              {t('Ouvidoria')}
            </Nav.Link>

            <span className="custom-span">|</span>
            <Nav.Link
              href="https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR"
              target="_blank"
              className="link-secondary link-opacity-50-hover links-color"
              rel="noreferrer"
            >
              {t('Acesso a informação')}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="d-flex gap-2 custom-div-acess">
        <div className="d-flex gap-1 margin-custom">
          <p className="links-color">{t('Acessibilidade')}</p>
          <button className="my-custom-button">A</button>
          <button className="my-custom-button">-A</button>
          <button className="my-custom-button">+A</button>
        </div>
        <div className="my-div-linguage">
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
      </div>
    </div>
  )
}

export default GovHeader
