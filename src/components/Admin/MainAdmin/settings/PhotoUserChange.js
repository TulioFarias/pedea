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
      <Modal
        show={showModalPhoto}
        onHide={handleClose}
        id="ContainerModalChangePhoto"
      >
        <Modal.Header closeButton>
          <Modal.Title className="titleModalChangePhoto">
            Mudar foto de perfil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="customBodyModalChangePhoto">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label htmlFor="fileInput" className="fileImageLabel">
                Clique aqui para selecionar uma nova imagem:
              </Form.Label>
              <button className="btn-file">
                <input
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="in-file"
                />
              </button>
            </Form.Group>
            <Button variant="secondary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalChangePhotoUser.propTypes = {
  showModalPhoto: PropTypes.bool.isRequired,
  setShowModalPhoto: PropTypes.func.isRequired
}

export default ModalChangePhotoUser
