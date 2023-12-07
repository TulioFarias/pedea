import '../../sass/LoginSystem/loginSystem.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'

function LoginSystem() {
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no minímo 6 dígitos.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleBack = () => {
    navigate('/')
  }

  const onSubmit = data => {
    setTimeout(() => {
      console.log(data)
      navigate('/admin')
    }, 1000)
  }

  return (
    <>
      <div className="container-form">
        <button className="btnBack" onClick={handleBack}>
          <img src={backIcon} />
        </button>

        <img src={logo} />

        <Form onSubmit={handleSubmit(onSubmit)} className="customBody-form">
          <div className="custom-info">
            <Form.Label htmlFor="email" className="LabelForm">
              Email:
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

          <button type="submit" className="Btn-Form">
            Entrar
          </button>

          <p className="end-txt">
            Não possui conta?{' '}
            <a href="#" className="link-end">
              Cadastre-se aqui
            </a>
          </p>
        </Form>
      </div>
    </>
  )
}

export default LoginSystem
