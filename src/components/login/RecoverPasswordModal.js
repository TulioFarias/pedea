import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import '../../sass/login/RecoverPass.scss'
import api from '../../services/api'
function RecoverPasswordModal({ show, setShow }) {
  const [email, setEmail] = useState('')

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.post('/recover-password', {
          email: data.email
        }),
        {
          pending: 'Verificando seu email...',
          success:
            'As instruções para recuperar sua senha foram enviadas para o seu e-mail.',
          error: 'Esse email não está cadastrado no sistema.'
        }
      )

      setShow(false)
    } catch (error) {
      return console.log(error)
    }
  }

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} id="ModalRecover">
        <Modal.Header closeButton className="HeaderModalRecover">
          <Modal.Title>Recuperar sua senha</Modal.Title>
        </Modal.Header>
        <Modal.Body className="BodyModalRecover">
          <p>
            Esqueceu sua senha? Não se preocupe! Siga os passos abaixo para
            recuperá-la:
          </p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail:</Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={handleEmailChange}
              />
              <p className="error-txtRecover">{errors.email?.message}</p>
            </Form.Group>
      
            <button
              className="Btn-FormRecover"
              type="submit"
         
            >
              Enviar
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

RecoverPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default RecoverPasswordModal
