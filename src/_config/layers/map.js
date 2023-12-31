import TileLayer from 'ol/layer/Tile.js'
import Map from 'ol/Map.js'
import OSM from 'ol/source/OSM.js'
import View from 'ol/View.js'

import { newLayers, explorer } from './index'

const projection = 'EPSG:4326'
const center = [-39.6956, -4.7907]
const zoom = 7

const mapInstance = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({
    projection,
    center,
    zoom,
    maxZoom: 18
  }),
  controls: []
})

export { mapInstance, projection, center, zoom, explorer }
