import { Tooltip } from '@mui/material'
import React from 'react'
import Flag from 'react-flagkit'

import '../../../sass/govHeader/GovHeader.scss'
function NavHeader() {
  return (
    <div className="d-flex justify-content-between my-custom-div bg-gray-header">
      <div className="d-flex gap-3 justify-content-around my-links-div">
        <a
          href="https://www.ceara.gov.br/"
          target="_blank"
          className="link-secondary link-opacity-50-hover links-color"
          rel="noreferrer"
        >
          Portal do Governo
        </a>
        <span>|</span>

        <a
          href="https://cearatransparente.ce.gov.br/"
          target="_blank"
          className=" link-secondary link-opacity-50-hover links-color"
          rel="noreferrer"
        >
          Ceará Transparente
        </a>
        <span>|</span>

        <a
          href="https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR"
          target="_blank"
          className=" link-secondary link-opacity-50-hover links-color"
          rel="noreferrer"
        >
          Ouvidoria
        </a>
        <span>|</span>

        <a
          href="https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR"
          target="_blank"
          className=" link-secondary link-opacity-50-hover links-color"
          rel="noreferrer"
        >
          Acesso a informação
        </a>
      </div>

      <div className="d-flex gap-2">
        <div className="d-flex gap-1 margin-custom">
          <p className="links-color">Acessibilidade</p>
          <button className="my-custom-button">A</button>
          <button className="my-custom-button">-A</button>
          <button className="my-custom-button">+A</button>
        </div>

        <div className="my-div-linguage">
          <Tooltip title="PT" placement="bottom">
            <button className="my-btns-linguage">
              <Flag country="BR" />
            </button>
          </Tooltip>

          <Tooltip title="EN" placement="bottom">
            <button className="my-btns-linguage">
              <Flag country="US" />
            </button>
          </Tooltip>

          <Tooltip title="ES" placement="bottom">
            <button className="my-btns-linguage">
              <Flag country="ES" />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
