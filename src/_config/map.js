import 'ol/ol.css'
import '../sass/Map/map.scss'

import MousePosition from 'ol/control/MousePosition.js'
import ScaleLine from 'ol/control/ScaleLine.js'
import Zoom from 'ol/control/Zoom.js'
import ZoomToExtent from 'ol/control/ZoomToExtent.js'
import { createStringXY } from 'ol/coordinate'
import TileLayer from 'ol/layer/Tile.js'
import Map from 'ol/Map.js'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import React, { useEffect, useState, useRef } from 'react'

function MapPedea() {
  const [mapInstance, setMapInstance] = useState(null)
  const mapTargetElement = useRef(null)

  useEffect(() => {
    initializeMap()
  }, [])

  const initializeMap = () => {
    if (mapTargetElement.current) {
      const newMapInstance = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({
          center: fromLonLat([-39.3077, -5.4926]),
          zoom: 7,
          minZoom: 2,
          maxZoom: 18
        })
      })

      newMapInstance.setTarget(mapTargetElement.current)

      const Scale = new ScaleLine()
      newMapInstance.addControl(Scale)

      const mousePositionControl = new MousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
      })
      newMapInstance.addControl(mousePositionControl)

      const reviewZoom = new Zoom({
        className: 'my-custom-btns'
      })
      newMapInstance.addControl(reviewZoom)

      const zoomExtent = new ZoomToExtent({
        className: 'my-custom-btns2'
      })

      newMapInstance.addControl(zoomExtent)

      setMapInstance(newMapInstance)
    }
  }

  console.log(mapInstance)
  return (
    <div>
      <div ref={mapTargetElement} className="map"></div>

      <div className="container-coord" id="mouse-position"></div>
    </div>
  )
}

export default MapPedea
