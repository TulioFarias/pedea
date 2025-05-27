import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState, useRef } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Toast } from 'primereact/toast'
import * as Yup from 'yup'

import '../../../../../sass/admin/Rotulos/modalRotulos.scss'
import api from '../../../../../services/api'

function EditModalRotulos({
  openModalEdit,
  setOpenModalEdit,
  handleTableUpdate,
  editItemId
}) {
  const [formsData, setFormData] = useState({
    key: '',
    pt_br: '',
    en: '',
    es: ''
  })

  const toastRef = useRef(null)

  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    pt_br: Yup.string().required('O novo valor é obrigatório.'),
    en: Yup.string().required('O novo valor é obrigatório.'),
    es: Yup.string().required('O novo valor é obrigatório.')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    setOpenModalEdit(false)
  }

  const handleChange = field => e => {
    const { value } = e.target
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const onSubmitUpdate = async data => {
    try {
      toastRef.current.show({
        severity: 'info',
        summary: 'Atualizando...',
        detail: 'Por favor, aguarde.',
        life: 2000
      })

      await api.put('/rotulosUpdate', {
        id: editItemId,
        key: data.key,
        pt_br: data.pt_br,
        en: data.en,
        es: data.es
      })

      toastRef.current.show({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Dados atualizados no banco de dados.',
        life: 3000
      })

      reset()
      handleTableUpdate()
      handleClose()
    } catch (error) {
      toastRef.current.show({
        severity: 'error',
        summary: 'Erro!',
        detail: 'Chave não corresponde ao ID fornecido.',
        life: 3000
      })
      console.log(error)
    }
  }

  return (
    <>
      <Toast ref={toastRef} />
      <Modal show={openModalEdit} onHide={handleClose} id="customModalRotulos">
        <Modal.Header closeButton>
          <Modal.Title className="titleEditRotulos">
            Editar valores do rótulo.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmitUpdate)}>
            <Form.Group className="mb-3">
              <Form.Label className="labelValuesRotulos">Chave:</Form.Label>
              <Form.Control
                type="text"
                {...register('key')}
                onChange={handleChange('key')}
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="labelValuesRotulos">
                Novo valor em português:
              </Form.Label>
              <Form.Control
                type="text"
                {...register('pt_br')}
                onChange={handleChange('pt_br')}
              />
              <p className="txtErrorPassword">{errors.pt_br?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="labelValuesRotulos">
                Novo valor em inglês:
              </Form.Label>
              <Form.Control
                type="text"
                {...register('en')}
                onChange={handleChange('en')}
              />
              <p className="txtErrorPassword">{errors.en?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="labelValuesRotulos">
                Novo valor em espanhol:
              </Form.Label>
              <Form.Control
                type="text"
                {...register('es')}
                onChange={handleChange('es')}
              />
              <p className="txtErrorPassword">{errors.es?.message}</p>
            </Form.Group>
            <Button variant="secondary" type="submit">
              Salvar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btnClose"
            variant="outline-secondary"
            onClick={handleClose}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

EditModalRotulos.propTypes = {
  openModalEdit: PropTypes.bool.isRequired,
  editItemId: PropTypes.string.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default EditModalRotulos
