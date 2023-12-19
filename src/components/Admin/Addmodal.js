import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import '../../sass/admin/modalAdmin.scss'
import { useDispatch } from 'react-redux'

import { addInfo } from '../../utils/redux/CRUD/actions'

export const ModalAdd = () => {
  const [show, setShow] = useState(false)
  const [formsData, setFormData] = useState({
    id: 0,
    name: '',
    email: '',
    observation: ''
  })

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)

  const dispatch = useDispatch()

  const handleNameChange = e => {
    setFormData(prevData => ({ ...prevData, name: e.target.value }))
  }
  const handleEmailChange = e => {
    setFormData(prevData => ({ ...prevData, email: e.target.value }))
  }
  const handleObservationChange = e => {
    setFormData(prevData => ({ ...prevData, observation: e.target.value }))
  }
  const sendForm = () => {
    setFormData(prevData => {
      const updatedData = { ...prevData, id: prevData.id + 1 }

      dispatch(addInfo(updatedData))
      handleClose()
      return updatedData
    })
  }
  const sendSubmit = event => {
    event.preventDefault()
    sendForm()
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="ButtonAdd">
        Adicionar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Informações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={sendForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Seu nome..."
                autoFocus
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Seu email..."
                autoFocus
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleObservationChange}
              />
            </Form.Group>
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
          <Button
            className="ButtonAdd"
            variant="primary"
            type="submit"
            onClick={sendSubmit}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
