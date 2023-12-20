import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import { Tooltip } from '@mui/material'
import React from 'react'
function Help() {
  return (
    <>
      <Tooltip title="Ajuda" placement="left">
        <button className="my-custom-btns">
          <QuestionMarkIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default Help
