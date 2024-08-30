import { Tooltip } from '@mui/material'
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Flag from 'react-flagkit'
import '../../sass/govHeader/GovHeader.scss'
import { useTranslation } from 'react-i18next'

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
            <a
              href="https://www.ceara.gov.br/"
              target="_blank"
              className="linksHeaderGov"
              rel="noreferrer"
            >
              {t('Portal do Governo')}
            </a>

            <span className="custom-span">|</span>
            <a
              href="https://cearatransparente.ce.gov.br/"
              target="_blank"
              className="linksHeaderGov"
              rel="noreferrer"
            >
              {t('Ceará Transparente')}
            </a>

            <span className="custom-span">|</span>
            <a
              href="https://cearatransparente.ce.gov.br/portal-da-transparencia/ouvidoria?locale=pt-BR"
              target="_blank"
              className="linksHeaderGov"
              rel="noreferrer"
            >
              {t('Ouvidoria')}
            </a>

            <span className="custom-span">|</span>
            <a
              href="https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR"
              target="_blank"
              className="linksHeaderGov"
              rel="noreferrer"
            >
              {t('Acesso a informação')}
            </a>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="custom-div-acess">
        <div className="divBtnsAcess">
          <p className="AcessName">{t('Acessibilidade')}</p>
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
