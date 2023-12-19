import AddIcon from '@mui/icons-material/Add'
import Grid4x4Icon from '@mui/icons-material/Grid4x4'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import RemoveIcon from '@mui/icons-material/Remove'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import { Tooltip } from '@mui/material'

import '../../sass/btns-Left/ButtonsLeft.scss'

import React from 'react'

function ButtonsMap() {
  return (
    <>
      <div className="containerBtns">
        <Tooltip title="Zoom" placement="left">
          <button className="my-custom-btns">
            <ZoomOutMapIcon />
          </button>
        </Tooltip>

        <Tooltip title="Aumentar o zoom" placement="left">
          <button className="my-custom-btns">
            <AddIcon />
          </button>
        </Tooltip>

        <Tooltip title="Diminuir o zoom" placement="left">
          <button className="my-custom-btns">
            <RemoveIcon />
          </button>
        </Tooltip>

        <Tooltip title="Trocar mapa base" placement="left">
          <button className="my-custom-btns">
            <LanguageIcon />
          </button>
        </Tooltip>

        <Tooltip title="Grade de coordenadas" placement="left">
          <button className="my-custom-btns">
            <Grid4x4Icon />
          </button>
        </Tooltip>

        <Tooltip title="Mostrar sua localização" placement="left">
          <button className="my-custom-btns">
            <LocationOnIcon />
          </button>
        </Tooltip>

        <Tooltip title="Localizar endereço" placement="left">
          <button className="my-custom-btns">
            <TravelExploreIcon />
          </button>
        </Tooltip>

        <Tooltip title="Ajuda" placement="left">
          <button className="my-custom-btns">
            <QuestionMarkIcon />
          </button>
        </Tooltip>
      </div>
    </>
  )
}

export default ButtonsMap
