import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Tooltip } from '@mui/material'
import React from 'react'

import { mapInstance } from '../../../_config/layers/map'
function ZoomInOut() {
  const zoomIn = () => {
    const currentZoom = mapInstance.getView().getZoom()
    const newZoom = currentZoom + 1

    mapInstance.getView().animate({
      zoom: newZoom,
      duration: 500
    })
  }

  const zoomOut = () => {
    const currentZoom = mapInstance.getView().getZoom()
    const newZoom = currentZoom - 1

    mapInstance.getView().animate({
      zoom: newZoom,
      duration: 500
    })
  }
  return (
    <>
      <Tooltip title="Aumentar o zoom" placement="left">
        <button className="my-custom-btns" onClick={zoomIn}>
          <AddIcon />
        </button>
      </Tooltip>

      <Tooltip title="Diminuir o zoom" placement="left">
        <button className="my-custom-btns" onClick={zoomOut}>
          <RemoveIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default ZoomInOut
