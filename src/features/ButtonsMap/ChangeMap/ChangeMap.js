import LanguageIcon from '@mui/icons-material/Language'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'

import ModalChange from './modalChange'
function ChangeMap() {
  const [show, setShow] = useState(false)

  const showOptionsMaps = () => {
    setShow(true)
  }
  return (
    <>
      <Tooltip title="Trocar mapa base" placement="left">
        <button className="my-custom-btns" onClick={showOptionsMaps}>
          <LanguageIcon />
        </button>
      </Tooltip>
      <ModalChange show={show} setShow={setShow} />
    </>
  )
}

export default ChangeMap
