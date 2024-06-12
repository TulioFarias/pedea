import '../../../../../sass/admin/Settings/passwordModal.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'

function ModalFAQDelete({ setOpenModalDelete, openModalDelete, idEditValue }) {
  const [valueDeleteFAQ, setValueDeleteFAQ] = useState({})
  const schema = Yup.object().shape({
    question: Yup.string().required('A pergunta é obrigatória'),
    confirmDelete: Yup.bool().oneOf(
      [true],
      'Confirme a exclusão para prosseguir'
    )
  })

  const closeModal = () => {
    setOpenModalDelete(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.put('/editFAQ', {
          id: idEditValue,
          question: data.question,
          answer: data.answer
        }),
        {
          pending: 'Excluindo...',
          success: 'FAQ excluido com sucesso!',
          error:
            'Ocorreu um erro, infelizmente não foi possivel excluir os dados.'
        }
      )
    } catch (error) {
      return console.log(error)
    }
  }

  const handleChangeQuestion = e => {
    const { value } = e.target
    setValueDeleteFAQ(prevData => ({ ...prevData, question: value }))
  }

  return (
    <Modal
      show={openModalDelete}
      onHide={closeModal}
      id="ContainerModalFAQEdit"
    >
      <Modal.Header closeButton>
        <Modal.Title className="titleModalFAQ">Excluir FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalFAQEdit">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">Edite a pergunta e confirme a exclusão abaixo:</p>

          <div className="containerInputsFAQEdit">
            <Form.Group controlId="formQuestion">
              <Form.Label className="labelInputFAQ">Pergunta:</Form.Label>
              <Form.Control
                type="text"
                {...register('question')}
                onChange={handleChangeQuestion}
                value={valueDeleteFAQ.question || ''}
              />
              <p className="txtErrorFAQ">{errors.question?.message}</p>
            </Form.Group>
            <Form.Group controlId="formConfirmDelete">
              <Form.Check
                type="checkbox"
                label="Confirmo que desejo excluir esta pergunta"
                {...register('confirmDelete')}
              />
              <p className="txtErrorFAQ">{errors.confirmDelete?.message}</p>
            </Form.Group>
          </div>

          <Button variant="danger" type="submit" className="btn-sendFAQ">
            Excluir
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={closeModal}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalFAQDelete.propTypes = {
  openModalDelete: PropTypes.bool.isRequired,
  setOpenModalDelete: PropTypes.func.isRequired,
  idEditValue: PropTypes.number.isRequired
}

export default ModalFAQDelete
