import Grid4x4Icon from '@mui/icons-material/Grid4x4'
import { Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'

import '../../sass/btns-Left/ButtonsLeft.scss'
import { mapInstance } from '../../_config/map'
import { vector } from '../../_config/vector'

function GridLayer() {
  const restoreElement = useRef()
  const gridLayer = mapInstance.getLayers().getArray()[
    mapInstance.getLayers().getArray().length - 1
  ]

  console.log(vector)

  const handleClick = () => {
    console.log('Antes de setVisible:', gridLayer.getVisible())
    gridLayer.setVisible(!gridLayer.getVisible())
    console.log('Depois de setVisible:', gridLayer.getVisible())
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
