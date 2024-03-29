import Grid4x4Icon from '@mui/icons-material/Grid4x4'
import { Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'

import { mapInstance } from '../../../_config/layers/map'
import { vector } from '../../../_config/layers/vector'

function GridLayer() {
  const restoreElement = useRef()
  const [gridLayer, setGridLayer] = useState(
    mapInstance.getLayers().getArray()[
      mapInstance.getLayers().getArray().length - 1
    ]
  )

  const handleClick = () => {
    gridLayer.setVisible(!gridLayer.getVisible())
    vector.getSource().clear()
  }

  return (
    <>
      <Tooltip
        title="Grade de coordenadas"
        placement="left"
        ref={restoreElement}
      >
        <button className="my-custom-btns gridLayer" onClick={handleClick}>
          <Grid4x4Icon />
        </button>
      </Tooltip>
    </>
  )
}

export default GridLayer
