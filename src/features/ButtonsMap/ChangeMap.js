import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Tooltip } from '@mui/material'
import React from 'react'
function ChangeMap() {
  return (
    <>
      <Tooltip title="Trocar mapa base" placement="left">
        <button className="my-custom-btns">
          <LanguageIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default ChangeMap
