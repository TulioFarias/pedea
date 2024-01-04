import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import { Tooltip } from '@mui/material'
import React, { useRef } from 'react'

import { center, zoom, mapInstance } from '../../_config/layers/map'
import { vector } from '../../_config/layers/vector'

function ResetZoom() {
  const element = useRef()

  const restoreElement = useRef()

  const handleClick = () => {
    vector.getSource().clear()
    mapInstance.getView().setZoom(zoom)
    mapInstance.getView().setCenter(center)
  }

  return (
    <>
      <Tooltip
        title="Redimensionar Zoom"
        placement="left"
        alt="Redimensionar zoom"
        ref={restoreElement}
      >
        <div className="ResetZoom">
          <button className="my-custom-btns" onClick={handleClick}>
            <ZoomOutMapIcon />
          </button>
          <div ref={element} className="ResetZoomContent">
            {' '}
          </div>
        </div>
      </Tooltip>
    </>
  )
}

export default ResetZoom
