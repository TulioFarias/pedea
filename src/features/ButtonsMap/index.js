import { Tooltip } from '@mui/material'

import '../../sass/btns-Left/ButtonsLeft.scss'

import React from 'react'

import ChangeMap from './ChangeMap'
import FindMe from './FindMe'
import GridLayer from './gridLayer'
import Help from './help'
import LocaleAdress from './LocateAdress'
import ResetZoom from './ResetZoom'
import ZoomInOut from './ZoomInOut'

function ButtonsMap() {
  return (
    <>
      <div className="containerBtns">
        <ResetZoom />

        <ZoomInOut />

        <ChangeMap />

        <GridLayer />

        <FindMe />

        <LocaleAdress />

        <Help />
      </div>
    </>
  )
}

export default ButtonsMap
