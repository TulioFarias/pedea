import '../../sass/Register/register.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'
import api from '../../services/api'
import { createUser } from '../../utils/redux/user/actions'

function RegisterUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    office: '',
    phoneNumber: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [recaptcha, setRecaptcha] = useState(null)

  const changeForm = async e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const dispatch = useDispatch()
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.')
      .required('Confirme sua senha.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleBack = () => {
    navigate('/login')
  }

  const onSubmit = async data => {
    try {
      const registerUser = await toast.promise(
        api.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password
        }),
        {
          pending: 'Verificando os dados...',
          success: 'Usuário cadastrado com sucesso.',
          error: 'Ops! Aconteceu algo de errado, tente novamente...'
        }
      )

      dispatch(createUser(registerUser))

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <div className="container-formRegister">
        <button className="btnBackRegister" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
        <img src={logo} alt="Logo" />

        <div className="containerRegisterUsers">
          <h1 className="titleLogin">Cadastro Portal Admin</h1>
          <hr className="hrLoginAndRegister" />
          <h6>
            Para realizar seu cadastro ao sistema de administração da PEDEA,
            preencha os campos abaixo:
          </h6>
          <Form onSubmit={handleSubmit(onSubmit)} className="formRegister">
            <div className="containerUserInfo">
              <div className="customContainerUser">
                <Form.Label htmlFor="name" className="LabelFormRegister">
                  Nome:
                </Form.Label>
                <Form.Control
                  {...register('name')}
                  type="text"
                  className="InputFormRegister"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={changeForm}
                  placeholder="Seu nome"
                />
                <p className="error-txtRegister">{errors.name?.message}</p>
              </div>

              <div className="customContainerUser">
                <Form.Label htmlFor="email" className="LabelFormRegister">
                  Email:
                </Form.Label>
                <Form.Control
                  {...register('email')}
                  type="email"
                  className="InputFormRegister"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={changeForm}
                  placeholder="exemplo@email.com"
                />
                <p className="error-txtRegister">{errors.email?.message}</p>
              </div>

              <div className="customContainerUser">
                <Form.Label htmlFor="password" className="LabelFormRegister">
                  Senha:
                </Form.Label>
                <Form.Control
                  {...register('password')}
                  type="password"
                  className="InputFormRegister"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={changeForm}
                  placeholder="Mínimo de 6 caracteres..."
                />
                <p className="error-txtRegister">{errors.password?.message}</p>
              </div>

              <div className="customContainerUser">
                <Form.Label
                  htmlFor="confirmPassword"
                  className="LabelFormRegister"
                >
                  Confirmar Senha:
                </Form.Label>
                <Form.Control
                  {...register('confirmPassword')}
                  type="password"
                  className="InputFormRegister"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={changeForm}
                  placeholder="Por favor, confirme sua senha..."
                />
                <p className="error-txtRegister">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            <ReCAPTCHA
              sitekey="6LezFHMpAAAAALIlQvnIfK6w0b__ZbmkJDiJ_f8I"
              onChange={value => setRecaptcha(value)}
            />

            <button disabled={!recaptcha} type="submit" className="Btn-Form">
              Cadastrar
            </button>

            <p className="end-txt">
              Já tem conta criada?{' '}
              <Link className="link-end" to="/login">
                Clique aqui
              </Link>
            </p>
          </Form>
        </div>
        <p className="govTxt">
          © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado do
          Ceará
        </p>
      </div>
    </>
  )
}

export default RegisterUser
