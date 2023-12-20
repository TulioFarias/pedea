import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { Tooltip } from '@mui/material'
import React from 'react'
function LocaleAdress() {
  return (
    <>
      <Tooltip title="Localizar endereço" placement="left">
        <button className="my-custom-btns">
          <TravelExploreIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default LocaleAdress
