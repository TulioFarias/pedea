import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
function EditModalRotulos({ openModalEdit, setOpenModalEdit }) {
  const [formsData, setFormData] = useState({
    name: '',
    email: '',
    observation: ''
  })

  const handleClose = () => {
    setOpenModalEdit(false)
  }

  const handleChangePT = e => {
    setFormData(prevData => ({ ...prevData, name: e.target.value }))
  }

  const handleChangeEN = e => {
    setFormData(prevData => ({ ...prevData, email: e.target.value }))
  }

  const handleChangeES = e => {
    setFormData(prevData => ({ ...prevData, observation: e.target.value }))
  }
  return (
    <>
      <div>
        <Modal show={openModalEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Informações</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Valores em Português:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  onChange={handleChangePT}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Valores em Inglês:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  onChange={handleChangeEN}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Valores em Espanhol:</Form.Label>
                <Form.Control type="text" rows={3} onChange={handleChangeES} />
              </Form.Group>
              <Button variant="secondary">Salvar</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btnClose"
              variant="secondary"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

EditModalRotulos.propTypes = {
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired
}

export default EditModalRotulos
