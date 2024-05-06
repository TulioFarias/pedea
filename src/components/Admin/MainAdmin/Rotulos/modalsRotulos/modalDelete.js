import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
function ModalConfirmDelete({ openModal, setOpenModal }) {
  const handleClose = () => {
    setOpenModal(false)
  }
  return (
    <>
      <Modal show={openModal} onHide={handleClose} closeButton>
        <Modal.Header closeButton>
          <Modal.Title>Excluir dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Os dados excluidos não podem ser recuperados.</p>
          <p>Tem certeza que deseja excluir os dados permanentemente?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="danger">Sim</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalConfirmDelete.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired
}

export default ModalConfirmDelete
