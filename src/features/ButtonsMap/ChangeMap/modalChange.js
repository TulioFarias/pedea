import PropTypes from 'prop-types'
import React, { useState } from 'react'
import '../../../sass/Map/modalMap.scss'
import { Modal, Form } from 'react-bootstrap'
function ModalChange({ show, setShow }) {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = option => {
    setSelectedOption(option)
  }

  console.log(selectedOption)

  const handleSubmit = () => {
    console.log('Apenas teste')
  }
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="customBodyModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Trocar mapa base</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="containersOptions">
            <Form.Label>Google</Form.Label>
            <Form.Check
              type="radio"
              label="🌎 Imagem de satélite"
              name="mapOptions"
              id="googleSatelite"
              onChange={() => handleOptionChange('Google - Imagem de satélite')}
            />
            <Form.Check
              type="radio"
              label="🌎 Ruas"
              name="mapOptions"
              id="googleRuas"
              onChange={() => handleOptionChange('Google - Ruas')}
            />
            <Form.Check
              type="radio"
              label="🌎 Híbrido: imagem de satélite e ruas"
              name="mapOptions"
              id="googleHibrido"
              onChange={() => handleOptionChange('Google - Híbrido')}
            />
            <hr />

            <Form.Label>ESRI</Form.Label>
            <Form.Check
              type="radio"
              label="🌎 Mapa topográfico"
              name="mapOptions"
              id="esriTopografico"
              onChange={() => handleOptionChange('ESRI - Mapa topográfico')}
            />
            <Form.Check
              type="radio"
              label="🌎 Imagem de satélite"
              name="mapOptions"
              id="esriSatelite"
              onChange={() => handleOptionChange('ESRI - Imagem de satélite')}
            />
            <Form.Check
              type="radio"
              label="🌎 Logradouros"
              name="mapOptions"
              id="esriLogradouros"
              onChange={() => handleOptionChange('ESRI - Logradouros')}
            />
            <hr />

            <Form.Label>Open Street Maps</Form.Label>
            <Form.Check
              type="radio"
              label="🌎 Vias"
              name="mapOptions"
              id="osmVias"
              onChange={() => handleOptionChange('Open Street Maps - Vias')}
            />
            <hr />

            <button onClick={handleSubmit} className="BtnSubmit">
              Salvar
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalChange.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default ModalChange
