import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import edit from '../../../assets/icons/edit.png'
import { updateInfo } from '../../../utils/redux/CRUD/actions'
export const EditedModal = ({ editId }) => {
  const [show, setShow] = useState(false)

  const [formsData, setFormData] = useState({
    name: '',
    email: '',
    observation: ''
  })

  const handleClose = () => setShow(false)
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

  const EditForm = async e => {
    if (e) {
      e.preventDefault()
    }

    try {
      const formDataWithId = { ...formsData, id: editId }
      await dispatch(updateInfo(formDataWithId))
      toast.success('Informações atualizadas com sucesso!')

      handleClose()
    } catch (error) {
      toast.error('Erro ao atualizar as informações.')
    }
  }

  const EditChanges = async () => {
    EditForm()
  }

  return (
    <>
      <button onClick={handleShow} className="btns">
        <img src={edit} alt="Edit" />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Informações</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditForm}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Seu nome..."
                autoFocus
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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
            <Button
              className="ButtonAdd"
              variant="primary"
              type="submit"
              onClick={EditChanges}
            >
              Salvar
            </Button>
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
    </>
  )
}

EditedModal.propTypes = {
  editId: PropTypes.number.isRequired
}
