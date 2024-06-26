import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Tooltip } from '@mui/material'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import React from 'react'

import { mapInstance } from '../../../_config/layers/map'
import { vector } from '../../../_config/layers/vector'

function FindMe() {
  const buscarLocalizacao = async () => {
    try {
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords

          const markerLayer = new VectorLayer({
            source: vector.getSource()
          })

          const coords = [longitude, latitude]
          const point = new Point(coords)
          const pointFeature = new Feature(point)
          const vectorStyle = [
            new Style({
              fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({
                  color: 'rgba(169,0,201,1)'
                })
              })
            }),

            new Style({
              image: new CircleStyle({
                radius: 70,
                fill: new Fill({
                  color: 'rgba(255,255,255,0.4)'
                }),
                stroke: new Stroke({
                  color: 'rgba(169,0,201,1)',
                  width: 2
                })
              })
            })
          ]

          vector.setStyle(vectorStyle)
          markerLayer.getSource().clear()
          markerLayer.getSource().addFeature(pointFeature)

          mapInstance.getView().setCenter(coords)
          mapInstance.getView().setZoom()
        })
      } else {
        alert('Ocorreu um erro')
      }
    } catch (error) {
      console.error('Erro ao obter localização:', error)
    }
  }

  return (
    <div>
      <Tooltip title="Mostrar sua localização" placement="left">
        <button onClick={buscarLocalizacao} className="my-custom-btns">
          <LocationOnIcon />
        </button>
      </Tooltip>
    </div>
  )
}

export default FindMe
