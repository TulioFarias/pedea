
import { Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';

function GrapichModules() {
 

  return (
    <>
      <Tooltip
        title="Modulo de gráficos"
        placement="left"
       
      >
        <button className="my-custom-btns GrapichModules" >
          <QueryStatsRoundedIcon />
        </button>
      </Tooltip>
    </>
  )
}

export default GrapichModules