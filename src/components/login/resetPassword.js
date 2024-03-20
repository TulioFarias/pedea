import '../../sass/login/resetPass.scss'
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
  const [form, setForm] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  })
  const [recaptcha, setRecaptcha] = useState(null)

  const changeForm = async e => {
    const { name, value } = e.target

    setForm({ ...form, [name]: value })
  }

  const handleClickRecaptcha = event => {
    setRecaptcha(event)
  }

  const schema = Yup.object().shape({
    token: Yup.string().required('O token é obrigatório.'),
    password: Yup.string()
      .required('A nova senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.')
      .required('Confirme sua nova senha senha.')
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
      console.log('enviado')
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
          <h1 className="titleLoginResetPass">Recuperação de senha</h1>
          <hr className="hrLoginAndRegister" />
          <div className="custom-info">
            <p className="txtRecoverPass">
              Preencha os campos abaixo com token recebido em seu e-mail, gere
              uma nova senha.
            </p>

            <p className="txtRecoverPass">
              ⚠️: Caso o token expire, será necessário enviar uma nova
              solicitação para gerar um novo token.
            </p>
          </div>

          <div className="containerUserInfoResetPass">
            <div className="custom-info">
              <Form.Label htmlFor="token" className="LabelFormResetPass">
                Digite aqui o token recebido:
              </Form.Label>
              <Form.Control
                {...register('token')}
                type="password"
                className="InputFormResetPass"
                id="token"
                name="token"
                value={form.token}
                onChange={changeForm}
                placeholder="XXXXXXXXXXX"
              />
              <p className="error-txt">{errors.token?.message}</p>
            </div>

            <div className="custom-info">
              <Form.Label htmlFor="password" className="LabelFormResetPass">
                Nova senha:
              </Form.Label>
              <Form.Control
                {...register('password')}
                type="password"
                className="InputFormResetPass"
                id="password"
                name="password"
                value={form.password}
                onChange={changeForm}
                placeholder="Sua nova senha..."
              />
              <p className="error-txt">{errors.password?.message}</p>
            </div>

            <div className="custom-info">
              <Form.Label
                htmlFor="confirmPassword"
                className="LabelFormResetPass"
              >
                Confirmar nova senha:
              </Form.Label>
              <Form.Control
                {...register('confirmPassword')}
                type="password"
                className="InputFormResetPass"
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
            onChange={handleClickRecaptcha}
          />

          <button type="submit" className="Btn-Form" disabled={!recaptcha}>
            Entrar
          </button>
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
