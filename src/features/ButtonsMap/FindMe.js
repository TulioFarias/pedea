import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Tooltip } from '@mui/material'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import React from 'react'

import { vector } from '../../_config/layers/vector'
import { mapInstance } from '../../_config/map'

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
          markerLayer.getSource().clear()
          markerLayer.getSource().addFeature(pointFeature)

          mapInstance.getView().setCenter(coords)
          mapInstance.getView().setZoom(13)

          alert(`Sua localização: Latitude ${latitude}, Longitude ${longitude}`)
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
