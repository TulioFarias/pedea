import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

import '../../../sass/btns-Left/locateModal.scss'
import searchIcon from '../../../assets/icons/searchIcon.png'

function LocateModal({ show, setShow }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    console.log(`Pesquisar por: ${searchTerm}`)
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
              <img src={searchIcon} />
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
