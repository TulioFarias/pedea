import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'
function ModalConfirmDelete({ openModal, setOpenModal, handleTableUpdate }) {
  const [valueDelete, setValueDelete] = useState({
    id: '',
    key: ''
  })

  const handleClose = () => {
    setOpenModal(false)
  }

  const schema = Yup.object().shape({
    id: Yup.string().required('O ID é obrigatório.'),
    key: Yup.string().required('A chave é obrigatória')
  })

  const handleIdChange = event => {
    const { value } = event.target
    setValueDelete(prevState => ({
      ...prevState,
      id: value
    }))
  }

  const handleKeyChange = event => {
    const { value } = event.target
    setValueDelete(prevState => ({
      ...prevState,
      key: value
    }))
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    try {
      const payload = {
        id: data.id,
        key: data.key
      }
      const response = await toast.promise(
        api.delete('/rotulosDelete', {
          data: payload
        }),
        {
          pending: 'Atualizando...',
          success: 'Dados excluídos do banco de dados',
          error: 'Não foi possível excluir os dados...'
        }
      )

      reset()
      handleTableUpdate()
      handleClose()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <>
      <Modal show={openModal} onHide={handleClose} closeButton>
        <Modal.Header closeButton>
          <Modal.Title>Excluir dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> ⚠️ : Os dados excluídos não podem ser recuperados.</p>
          <p>Tem certeza que deseja excluir os dados permanentemente?</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formId">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o ID"
                {...register('id')}
                onChange={handleIdChange}
              />
              <p className="txtErrorPassword">{errors.id?.message}</p>
            </Form.Group>

            <Form.Group controlId="formKey">
              <Form.Label>Chave:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a chave"
                {...register('key')}
                onChange={handleKeyChange}
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <Button variant="danger" type="submit">
              Confirmar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

ModalConfirmDelete.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default ModalConfirmDelete
