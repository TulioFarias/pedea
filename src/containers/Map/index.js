import TileLayer from 'ol/layer/Tile.js'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import 'ol/ol.css'
import '../../sass/Map/map.scss'

function MapPedea({ mapTargetElement }) {
  useEffect(() => {
    let mapInstance
    const initializeMap = () => {
      if (mapTargetElement.current) {
        const mapInstance = new Map({
          layers: [new TileLayer({ source: new OSM() })],
          view: new View({
            center: [],
            zoom: 6,
            minZoom: 0,
            maxZoom: 28
          })
        })

        mapInstance.setTarget(mapTargetElement.current)
      }
    }

    initializeMap()

    return () => {
      if (mapInstance) {
        mapInstance.setTarget(null)
      }
    }
  }, [mapTargetElement])

  return (
    <div
      ref={mapTargetElement}
      className="map"
      style={{
        width: '100%',
        height: '85vh',
        position: 'absolute'
      }}
    ></div>
  )
}

MapPedea.propTypes = {
  mapTargetElement: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired
}

export default MapPedea
