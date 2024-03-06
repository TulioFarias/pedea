import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/Settings/photouserModal.scss'
import PropTypes from 'prop-types'
function ModalChangePhotoUser({ showModalPhoto, setShowModalPhoto }) {
  const handleClose = () => setShowModalPhoto(false)

  const handleSubmit = e => {
    e.preventDefault()

    handleClose()
  }
  return (
    <>
      <div>
        {' '}
        <Modal show={showModalPhoto} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Mudar foto de perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Selecionar foto:</Form.Label>
                <input
                  type="file"
                  className="fileImageInput"
                  accept="image/png, image/jpeg"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

ModalChangePhotoUser.propTypes = {
  showModalPhoto: PropTypes.bool.isRequired,
  setShowModalPhoto: PropTypes.func.isRequired
}

export default ModalChangePhotoUser
