import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../../../../../sass/admin/Settings/passwordModal.scss'

import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../../services/api'

function ModalEditFAQ({ openModal, setOpenModal, idEditValue }) {
  const [valueEditFAQ, setValueEditFAQ] = useState({
    question: '',
    answer: ''
  })
  const schema = Yup.object().shape({
    question: Yup.string().required('A pergunta é obrigatória'),
    answer: Yup.string().required('A resposta é obrigatória')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const closeModal = () => {
    setOpenModal(false)
  }

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.put('/editFAQ', {
          id: idEditValue,
          question: data.question,
          answer: data.answer
        }),
        {
          pending: 'Atualizando...',
          success: 'Dados atualizados no banco de dados',
          error: 'Chave não corresponde ao ID fornecido.'
        }
      )
    } catch (error) {
      return console.log(error)
    }
  }

  const handleChangeQuestion = e => {
    const { value } = e.target
    setValueEditFAQ(prevData => ({ ...prevData, question: value }))
  }

  const handleChangeAnswer = e => {
    const { value } = e.target
    setValueEditFAQ(prevData => ({ ...prevData, answer: value }))
  }

  return (
    <Modal show={openModal} onHide={closeModal} id="ContainerModalFAQEdit">
      <Modal.Header closeButton>
        <Modal.Title className="titleModalFAQ">Editar FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalFAQEdit">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">Edite a pergunta e a resposta abaixo:</p>

          <div className="containerInputsFAQEdit">
            <Form.Group controlId="formQuestion">
              <Form.Label className="labelInputFAQ">Pergunta:</Form.Label>
              <Form.Control
                type="text"
                {...register('question')}
                onChange={handleChangeQuestion}
              />
              <p className="txtErrorFAQ">{errors.question?.message}</p>
            </Form.Group>
            <Form.Group controlId="formAnswer">
              <Form.Label className="labelInputFAQ">Resposta:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('answer')}
                onChange={handleChangeAnswer}
              />
              <p className="txtErrorFAQ">{errors.answer?.message}</p>
            </Form.Group>
          </div>

          <Button variant="secondary" type="submit" className="btn-sendFAQ">
            Enviar
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

ModalEditFAQ.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  idEditValue: PropTypes.number.isRequired
}

export default ModalEditFAQ
