import '../../sass/LoginSystem/loginSystem.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'
import { loginAndRetrieveToken } from '../../services/fireBaseConfig'
import { loginUser } from '../../utils/redux/user/actions'

function LoginSystem() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const changeForm = e => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const dispatch = useDispatch()

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
      const { email, password } = form

      const fireauth = await loginAndRetrieveToken(email, password)
      const userAuthInfo = {
        uid: fireauth.user.uid,
        displayName: fireauth.user.displayName,
        email: fireauth.user.email
      }

      dispatch(loginUser({ auth: userAuthInfo }))

      toast.success('Seja bem-vindo(a).', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    } catch (error) {
      toast.error('Email ou senha incorretos, verifique e tente novamente...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
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
          <h1 className="titleLogin">Sistema de Admininstração</h1>
          <hr />
          <div className="custom-info">
            <Form.Label htmlFor="email" className="LabelForm">
              Email:
            </Form.Label>
            <Form.Control
              {...register('email')}
              type="email"
              className="InputForm"
              id="email"
              name="email"
              value={form.email}
              onChange={changeForm}
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
              name="password"
              value={form.password}
              onChange={changeForm}
            />
            <p className="error-txt">{errors.password?.message}</p>
          </div>
          <Link className="RetrieveAccLink">Esqueceu sua senha?</Link>
          <button type="submit" className="Btn-Form">
            Entrar
          </button>

          <p className="end-txt">
            Não tem cadastro?{' '}
            <Link href="#" className="link-end" to="/register">
              Clique aqui
            </Link>
          </p>
        </Form>
      </div>
    </>
  )
}

export default LoginSystem
