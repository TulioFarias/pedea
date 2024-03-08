import '../../sass/btns-map/ButtonsLeft.scss'

import React from 'react'

import MapLayers from './ChangeMap/changeMapSystem'
import FindMe from './FindMe/FindMe'
import GridLayer from './gridLayer/gridLayer'
import Help from './help/help'
import ImportData from './ImportData/importData'
import LocaleAdress from './LocateAdress/LocateAdress'
import ResetZoom from './ResetZoom/ResetZoom'
import ZoomInOut from './ZoomInOut/ZoomInOut'

function ButtonsMap() {
  return (
    <>
      <div className="containerBtns">
        <ResetZoom />

        <ZoomInOut />

        <MapLayers />

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
