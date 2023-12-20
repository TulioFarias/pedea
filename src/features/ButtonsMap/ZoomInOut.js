import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Tooltip } from '@mui/material'
import React from 'react'
function ZoomInOut() {
  return (
    <>
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
    </>
  )
}

export default ZoomInOut
