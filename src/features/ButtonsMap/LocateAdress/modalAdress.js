import axios from 'axios'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import { fromLonLat } from 'ol/proj'
import { Vector as VectorSource } from 'ol/source'
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import 'ol/ol.css'
import { mapInstance } from '../../../_config/layers/map'
import '../../../sass/btns-map/locateModal.scss'
import searchIcon from '../../../assets/icons/searchIcon.png'

function LocateModal({ show, setShow }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = async () => {
    try {
      const response = await axios(
        `https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=1`
      )

      if (!response.ok) {
        throw new Error('Falha ao buscar dados do serviço de geocodificação.')
      }

      const data = await response.json()

      if (data.length > 0) {
        const coordinates = [parseFloat(data[0].lon), parseFloat(data[0].lat)]
        const point = new Point(fromLonLat(coordinates))
        const pointFeature = new Feature(point)

        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [pointFeature]
          }),
          style: new Style({
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({
                color: '#ffcc33'
              }),
              stroke: new Stroke({
                color: '#ffcc33',
                width: 2
              })
            })
          })
        })

        mapInstance.addLayer(vectorLayer)
        mapInstance.updateSize()
        mapInstance.getView().setCenter(fromLonLat(coordinates))
        mapInstance.getView().setZoom(15)

        setShow(false)
      } else {
        console.error('Nenhum resultado encontrado para a pesquisa.')
      }
    } catch (error) {
      console.error('Erro ao realizar a pesquisa:', error)
    }
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Buscador de Endereço</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="SearchLocate">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Digite sua pesquisa..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="inputText"
              />
            </Form.Group>

            <button onClick={handleSearch} className="btnSearchAdress">
              <img src={searchIcon} alt="Search" />
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

LocateModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default LocateModal
