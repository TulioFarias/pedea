import '../../sass/Register/register.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'
import { createRegister } from '../../services/fireBaseConfig'

function RegisterUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const changeForm = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Senhas devem ser iguais.'
    )
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
      const { name, email, password } = form

      const fireauth = await createRegister(email, password)
      const userAuthInfo = {
        uid: fireauth.user.uid,
        displayName: fireauth.user.displayName,
        email: fireauth.user.email
      }

      toast.success('Conta criada com sucesso.', {
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
        navigate('/login')
      }, 2000)
    } catch (error) {
      toast.error(
        'Opsss, aconteceu algum erro ao criar seu usuário, verifique e tente novamente...',
        {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        }
      )
    }
  }

  return (
    <>
      <div className="container-form">
        <button className="btnBack" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
        <img src={logo} alt="Logo" />

        <Form onSubmit={handleSubmit(onSubmit)} className="formRegister">
          <h1 className="titleLogin">Cadastro Portal Admin</h1>
          <hr />
          <h6>
            Para realizar seu cadastro ao sistema de administração da PEDEA,
            preencha os campos abaixo:
          </h6>
          <div className="custom-info">
            <Form.Label htmlFor="name" className="LabelForm">
              Nome:
            </Form.Label>
            <Form.Control
              {...register('name')}
              type="text"
              className="InputForm"
              id="name"
              name="name"
              value={form.name}
              onChange={changeForm}
            />
            <p className="error-txt">{errors.name?.message}</p>
          </div>

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

          <div className="custom-info">
            <Form.Label htmlFor="confirmPassword" className="LabelForm">
              Confirmar Senha:
            </Form.Label>
            <Form.Control
              {...register('confirmPassword')}
              type="password"
              className="InputForm"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={changeForm}
            />
            <p className="error-txt">{errors.confirmPassword?.message}</p>
          </div>

          <button type="submit" className="Btn-Form">
            Cadastrar
          </button>

          <p className="end-txt">
            Ja tem conta criada?{' '}
            <Link className="link-end" to="/login">
              Clique aqui
            </Link>
          </p>
        </Form>
      </div>
    </>
  )
}

export default RegisterUser
