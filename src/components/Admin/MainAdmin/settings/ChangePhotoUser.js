import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/Settings/modalPhotoSettings.scss'
function ModalChangePhotoUser() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = e => {
    e.preventDefault()
    // Adicione aqui a lógica para enviar a foto
    handleClose()
  }
  return (
    <>
      <div>
        {' '}
        <Modal show={show} onHide={handleClose}>
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

export default ModalChangePhotoUser
