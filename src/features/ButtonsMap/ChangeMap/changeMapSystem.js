import React, { useRef, useState, useEffect } from 'react'

import { ServerTypeHelper } from '../../../_config/layers/helpers'
import { vector } from '../../../_config/layers/index'
import { mapInstance } from '../../../_config/layers/map'

const baseLayer = []

function MapLayers() {
  const restoreElement = useRef()

  const [active, setActive] = useState(0)
  const [baseLayersJSX, setBaseLayersJSX] = useState([])

  const handleClick = () => {
    vector.getSource.clear()
    setActive(active => active + 1)
  }

  const handleBaseLayerClick = event => {
    const key = event.target.value

    baseLayer.forEach(layer => {
      if (layer.get('title') === key) layer.setVisible(true)
      else {
        layer.setVisible(false)
      }
    })
  }
  const buildBaseLayerTree = () => {
    const currentLayersJSX = []

    const layersAux = []

    let provider = ''

    mapInstance.map
      .getLayers()
      .getArray()
      .forEach((layer, index) => {
        const isBaseLayer =
          layer.get('serverType') !== ServerTypeHelper.GEOSERVER &&
          layer.get('title') &&
          layer.get('title') !== 'Grade'

        const currentProvider = layer.get('folder')

        if (isBaseLayer && currentProvider !== provider) {
          provider = currentProvider
          currentLayersJSX.push(<br key={'brBase' + index} />)
          currentLayersJSX.push(<h5 key={'hBase' + index}>{provider}</h5>)
          currentLayersJSX.push(<hr key={'hrBase' + index} />)
        }

        isBaseLayer &&
          currentLayersJSX.push(
            <div className="LayerFolderItem" key={index}>
              <input
                className="layerRadio form-radio-input"
                type="radio"
                name="baseLayer"
                defaultChecked={layer.getVisible()}
                id={'layer' + index}
                value={layer.get('title')}
                onClick={handleBaseLayerClick}
              />

              <label className="form-radio-label" htmlFor={'layer' + index}>
                <h6 className="LayerTitle">🌎 {layer.get('title')}</h6>
              </label>
            </div>
          )

        isBaseLayer && layersAux.push(layer)
      })

    // console.log(layersAux)

    baseLayerSwitcher = layersAux

    setBaseLayersJSX(currentLayersJSX)
  }

  useEffect(buildBaseLayerTree, [])
}

export default MapLayers
