import 'ol/ol.css'
import '../../sass/Map/map.scss'

import FullScreen from 'ol/control/FullScreen.js'
import TileLayer from 'ol/layer/Tile.js'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import NavButtonsLeft from '../../components/NavButtonsLeft'

function MapPedea({ mapTargetElement }) {
  const mapInstance = null

  useEffect(() => {
    const initializeMap = () => {
      if (mapTargetElement.current) {
        const mapInstance = new Map({
          layers: [new TileLayer({ source: new OSM() })],
          view: new View({
            center: [0, 0],
            zoom: 0,
            minZoom: 0,
            maxZoom: 28
          })
        })

        mapInstance.setTarget(mapTargetElement.current)

        const fullScreenControl = new FullScreen({
          target: mapTargetElement.current
        })
        mapInstance.addControl(fullScreenControl)
      }
    }

    initializeMap()

    return () => {
      if (mapInstance) {
        mapInstance.setTarget(null)
      }
    }
  }, [mapTargetElement])

  console.log(mapInstance)

  return (
    <div>
      <div>
        <NavButtonsLeft />
      </div>
      <div ref={mapTargetElement} className="map"></div>
    </div>
  )
}

MapPedea.propTypes = {
  mapTargetElement: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired
}

export default MapPedea
