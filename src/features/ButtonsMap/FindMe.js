import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Tooltip } from '@mui/material'
import React from 'react'
function FindMe() {
  return (
    <>
      <Tooltip title="Mostrar sua localização" placement="left">
        <button className="my-custom-btns">
          <LocationOnIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default FindMe
