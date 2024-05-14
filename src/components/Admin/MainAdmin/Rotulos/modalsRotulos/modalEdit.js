import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'
function EditModalRotulos({
  openModalEdit,
  setOpenModalEdit,
  handleTableUpdate
}) {
  const [formsData, setFormData] = useState({
    key: '',
    pt_br: '',
    en: '',
    es: ''
  })

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

  const handleClose = () => {
    setOpenModalEdit(false)
  }

  const handleChangeKey = e => {
    const { value } = e.target
    setFormData(prevData => ({ ...prevData, key: value }))
  }

  const handleChangePT = e => {
    const { value } = e.target
    setFormData(prevData => ({ ...prevData, pt_br: value }))
  }

  const handleChangeEN = e => {
    const { value } = e.target
    setFormData(prevData => ({ ...prevData, en: value }))
  }

  const handleChangeES = e => {
    const { value } = e.target
    setFormData(prevData => ({ ...prevData, es: value }))
  }

  const onSubmitUpdate = async data => {
    console.log(data)
    console.log('ta clicando aqui')
    try {
      const response = await toast.promise(
        api.put('/rotulosUpdate', {
          key: data.key,
          pt_br: data.pt_br,
          en: data.en,
          es: data.es
        }),
        {
          pending: 'Atualizando...',
          success: 'Dados atualizados no banco de dados',
          error: 'Não foi possível atualizar os dados...'
        }
      )

      console.log('ta clicando aqui')

      reset()
      handleTableUpdate()
      handleClose()
    } catch (error) {
      return console.log(error)
    }
  }

  console.log(formsData)

  return (
    <>
      <div>
        <Modal show={openModalEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar valores do rótulo.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmitUpdate)}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Chave:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  {...register('key')}
                  onChange={handleChangeKey}
                />
                <p className="txtErrorPassword">{errors.key?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Novo valor em português:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  {...register('pt_br')}
                  onChange={handleChangePT}
                />
                <p className="txtErrorPassword">{errors.pt_br?.message}</p>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Novo valor em inglês:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  autoFocus
                  {...register('en')}
                  onChange={handleChangeEN}
                />
                <p className="txtErrorPassword">{errors.en?.message}</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Novo valor em espanhol:</Form.Label>
                <Form.Control
                  type="text"
                  rows={3}
                  {...register('es')}
                  onChange={handleChangeES}
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
  setOpenModalEdit: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
}

export default EditModalRotulos
