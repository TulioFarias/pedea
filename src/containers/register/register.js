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
    lastName: Yup.string().required('O Sobrenome é obrigatório.'),
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    office: Yup.string().required('O cargo é obrigatório.'),
    phoneNumber: Yup.string()
      .matches(
        /^\d{11}$/,
        'Digite um número de telefone válido com 11 dígitos.'
      )
      .required('O número de telefone é obrigatório.'),
    address: Yup.string().required('O endereço é obrigatório.'),
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
      const registerUser = await api.post('/register/user', {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        office: data.office,
        phoneNumber: data.phoneNumber,
        address: data.address,
        password: data.password
      })

      dispatch(createUser(registerUser))
      toast.success('Usuário cadastrado com sucesso.', {
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
      <div className="container-formRegister">
        <button className="btnBackRegister" onClick={handleBack}>
          <img src={backIcon} alt="Back" />
        </button>
        <img src={logo} alt="Logo" />

        <div className="containerRegisterUsers">
          <h1 className="titleLogin">Cadastro Portal Admin</h1>
          <hr />
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
                <Form.Label htmlFor="lastName" className="LabelFormRegister">
                  Sobrenome:
                </Form.Label>
                <Form.Control
                  {...register('lastName')}
                  type="text"
                  className="InputFormRegister"
                  id="lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={changeForm}
                  placeholder="Seu sobrenome"
                />
                <p className="error-txtRegister">{errors.lastName?.message}</p>
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
                <Form.Label htmlFor="email" className="LabelFormRegister">
                  Cargo:
                </Form.Label>
                <Form.Control
                  {...register('office')}
                  type="text"
                  className="InputFormRegister"
                  id="office"
                  name="office"
                  value={form.office}
                  onChange={changeForm}
                  placeholder="Técnico - Sig"
                />
                <p className="error-txtRegister">{errors.office?.message}</p>
              </div>

              <div className="customContainerUser">
                <Form.Label htmlFor="phoneNumber" className="LabelFormRegister">
                  Número de Telefone:
                </Form.Label>
                <Form.Control
                  {...register('phoneNumber')}
                  type="tel"
                  className="InputFormRegister"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={changeForm}
                  placeholder="(00)00000-0000"
                />
                <p className="error-txtRegister">
                  {errors.phoneNumber?.message}
                </p>
              </div>

              <div className="customContainerUser">
                <Form.Label htmlFor="address" className="LabelFormRegister">
                  Endereço:
                </Form.Label>
                <Form.Control
                  {...register('address')}
                  type="text"
                  className="InputFormRegister"
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={changeForm}
                  placeholder="Rua Brasil, 100 - Bairro, Cidade, Estado..."
                />
                <p className="error-txtRegister">{errors.address?.message}</p>
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
