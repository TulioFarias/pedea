import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'

import LocateModal from './modalAdress'
function LocaleAdress() {
  const [show, setShow] = useState(false)

  const showOptionsLocate = () => {
    setShow(true)
  }
  return (
    <>
      <Tooltip title="Localizar endereço" placement="left">
        <button className="my-custom-btns" onClick={showOptionsLocate}>
          <TravelExploreIcon />
        </button>
      </Tooltip>
      <LocateModal show={show} setShow={setShow} />
    </>
  )
}

export default LocaleAdress
