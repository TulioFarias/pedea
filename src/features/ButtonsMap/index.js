import '../../sass/btns-Left/ButtonsLeft.scss'

import React from 'react'

import ChangeMap from './ChangeMap/ChangeMap'
import FindMe from './FindMe'
import GridLayer from './gridLayer'
import Help from './help/help'
import ImportData from './ImportData/importData'
import LocaleAdress from './LocateAdress/LocateAdress'
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

        <ImportData />

        <Help />
      </div>
    </>
  )
}

export default ButtonsMap
