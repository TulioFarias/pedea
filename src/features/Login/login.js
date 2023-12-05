import '../../sass/LoginSystem/loginSystem.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import IconLogin from '../../assets/icons/icon-login.png'
import logo from '../../assets/img/pedea-logo.png'

function LoginSystem() {
  const [show, setShow] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatório.')
      .min(6, 'A senha deve ter no minímo 6 dígitos.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleShow = () => {
    console.log('fui chamado')
    setShow(true)
  }
  const handleClose = () => setShow(false)

  const onSubmit = data => console.log(data)
  return (
    <>
      <div className="container-login">
        <img src={IconLogin} />
        <p>
          Olá, seja bem-vindo(a), realize seu{' '}
          <a className="links-login" onClick={handleShow}>
            Login
          </a>{' '}
          ou faça seu <a className="links-login">Cadastro</a>
        </p>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="title-custom">
            <img src={logo} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className="custom-modal-body">
            <div className="custom-info">
              <Form.Label htmlFor="email" className="LabelForm">
                Seu email:
              </Form.Label>
              <Form.Control
                {...register('email')}
                type="email"
                className="InputForm"
                id="email"
              />
              <p className="error-txt">{errors.email?.message}</p>
            </div>

            <div className="custom-info">
              <Form.Label htmlFor="password" className="LabelForm">
                Senha:
              </Form.Label>
              <Form.Control
                {...register('password')}
                type="password"
                className="InputForm"
                id="password"
              />
              <p className="error-txt">{errors.password?.message}</p>
            </div>

            <Button variant="primary" type="submit" className="Btn-Form">
              Entrar
            </Button>

            <p className="end-txt">
              Não possui conta?{' '}
              <a href="#" className="link-end">
                Cadastre-se aqui
              </a>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginSystem
