import PropTypes from 'prop-types'
import React from 'react'
import '../../../sass/Map/modalMap.scss'
import { Modal, Button } from 'react-bootstrap'

function ModalChange({ showModal, setShowModal, active, BaseLayersJSX }) {
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        id="ModalMap"
        active={active}
      >
        <Modal.Header>
          <Modal.Title>
            <h3>Trocar mapa base</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="containersOptions">{BaseLayersJSX}</Modal.Body>
        <div className="containerCloseBtn">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="CloseBtn"
          >
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  )
}

ModalChange.propTypes = {
  BaseLayersJSX: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  active: PropTypes.number.isRequired
}

export default ModalChange
