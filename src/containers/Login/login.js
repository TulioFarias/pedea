import '../../sass/LoginSystem/loginSystem.scss'
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
import { loginUser } from '../../utils/redux/user/actions'
import RecoverPasswordModal from './RecoverPasswordModal'

function LoginSystem() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [recaptcha, setRecaptcha] = useState(null)

  const changeForm = async e => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const handleClickRecaptcha = event => {
    setRecaptcha(event)
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

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.post('/login', {
          email: data.email,
          password: data.password
        }),
        {
          pending: 'Verificando os dados...',
          success: 'Seja bem-vindo(a).',
          error: 'Ops! E-mail e/ou senha inválidos '
        }
      )

      dispatch(loginUser(response.data))

      setTimeout(() => {
        navigate('/admin')
      }, 2500)
    } catch (error) {
      return error
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
          <hr className="hrLoginAndRegister" />
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

          <Link className="RetrieveAccLink" onClick={() => setShow(true)}>
            Esqueceu sua senha?
          </Link>
          <ReCAPTCHA
            sitekey="6LezFHMpAAAAALIlQvnIfK6w0b__ZbmkJDiJ_f8I"
            onChange={handleClickRecaptcha}
          />

          <button type="submit" className="Btn-Form" disabled={!recaptcha}>
            Entrar
          </button>

          <p className="end-txt">
            Não tem cadastro?{' '}
            <Link href="#" className="link-end" to="/register">
              Clique aqui
            </Link>
          </p>
        </Form>
        <p className="govTxt">
          © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado do
          Ceará
        </p>
      </div>
      <RecoverPasswordModal show={show} setShow={setShow} />
    </>
  )
}

export default LoginSystem
