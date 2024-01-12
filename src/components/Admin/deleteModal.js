import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { removeInfo } from '../../utils/redux/CRUD/actions'

function ConfirmDeleteModal({ show, handleClose, selectedId }) {
  const id = selectedId

  const dispatch = useDispatch()
  const removeItem = () => {
    dispatch(removeInfo(id))
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
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
        <Button variant="danger" onClick={removeItem}>
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
ConfirmDeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedId: PropTypes.func.isRequired
}

export default ConfirmDeleteModal
