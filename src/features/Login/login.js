import '../../sass/LoginSystem/loginSystem.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'
import { useUser } from '../../services/auth'
import { loginAndRetrieveToken } from '../../services/fireBaseConfig'

function LoginSystem() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { putUserData } = useUser()

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

  const onSubmit = async () => {
    try {
      const { user } = await loginAndRetrieveToken(email, password)

      putUserData(user)

      setTimeout(() => {
        navigate('/admin')
      }, 2000)

      toast.success('Seja bem-vindo(a).', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    } catch (error) {
      toast.error('Email ou senha incorretos, verifique e tente novamente...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
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
              onChange={e => setEmail(e.target.value)}
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
              onChange={e => setPassword(e.target.value)}
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
