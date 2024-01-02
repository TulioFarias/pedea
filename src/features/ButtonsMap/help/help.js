import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'

import ModalHelp from './modalHelp'
function Help() {
  const [show, setShow] = useState(false)

  const showOptionsHelp = () => {
    setShow(true)
  }
  return (
    <>
      <Tooltip title="Ajuda" placement="left">
        <button className="my-custom-btns" onClick={showOptionsHelp}>
          <QuestionMarkIcon />
        </button>
      </Tooltip>
      <ModalHelp show={show} setShow={setShow} />
    </>
  )
}

export default Help
