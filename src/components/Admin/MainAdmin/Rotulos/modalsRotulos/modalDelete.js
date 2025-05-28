import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Toast } from 'primereact/toast'
import { Button as PrimeButton } from 'primereact/button'

import '../../../../../sass/admin/Rotulos/modalRotulos.scss'
import api from '../../../../../services/api'

function ModalConfirmDelete({ openModal, setOpenModal, handleTableUpdate }) {
  const toast = useRef(null)
  const [valueDelete, setValueDelete] = useState({ id: '', key: '' })

  const handleClose = () => {
    setOpenModal(false)
  }

  const schema = Yup.object().shape({
    id: Yup.string().required('O ID é obrigatório.'),
    key: Yup.string().required('A chave é obrigatória')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleIdChange = event => {
    setValueDelete(prev => ({ ...prev, id: event.target.value }))
  }

  const handleKeyChange = event => {
    setValueDelete(prev => ({ ...prev, key: event.target.value }))
  }

  const onSubmit = async data => {
    const payload = { id: data.id, key: data.key }

    toast.current.show({
      severity: 'info',
      summary: 'Processando',
      detail: 'Tentando excluir os dados...',
      life: 1500
    })

    try {
      await api.delete('/rotulosDelete', { data: payload })

      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Dados excluídos do banco de dados',
        life: 3000
      })

      reset()
      handleTableUpdate()
      handleClose()
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Não foi possível excluir os dados.',
        life: 3000
      })
      console.error(error)
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Modal show={openModal} onHide={handleClose} id="customModalDelete" centered>
        <Modal.Header closeButton>
          <Modal.Title className="titleDeleteRotulos">Excluir rótulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>⚠️ Os dados excluídos não podem ser recuperados.</p>
          <p>Tem certeza que deseja excluir os dados permanentemente?</p>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formId">
              <Form.Label className="labelValuesRotulos">ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o ID"
                {...register('id')}
                onChange={handleIdChange}
              />
              <p className="txtErrorPassword">{errors.id?.message}</p>
            </Form.Group>

            <Form.Group controlId="formKey">
              <Form.Label className="labelValuesRotulos">Chave:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a chave"
                {...register('key')}
                onChange={handleKeyChange}
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <PrimeButton
                label="Confirmar"
                severity="danger"
                type="submit"
                style={{ borderRadius: '10px' }}
              />
            </div>
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
