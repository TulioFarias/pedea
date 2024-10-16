import '../../sass/Register/register.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
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
    email: '',
    password: '',
    confirmPassword: ''
  })


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
          error: 'Não foi possivel fazer o cadastro.'
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
        <Row>
          <div>
            <button className="btnBackRegister" onClick={handleBack}>
              <img src={backIcon} alt="Back" />
            </button>
          </div>
          <img src={logo} alt="Logo" className="pedeaImg" />
        </Row>
        <Row>
          <Col>
            <div className="containerRegisterUsers">
              <h1 className="titleRegister">Cadastro Portal Admin</h1>
              <hr className="hrLoginAndRegister" />
              <h6 className="txtRegister">
                Para realizar seu cadastro ao sistema de administração da PEDEA,
                preencha os campos abaixo:
              </h6>
              <Form onSubmit={handleSubmit(onSubmit)} className="formRegister">
                <div className="containerUserInfo">
                  <Row>
                    <Col>
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
                        isInvalid={errors.name}
                      />
                      <p className="error-txtRegister">
                        {errors.name?.message}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
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
                        isInvalid={errors.email}
                      />
                      <p className="error-txtRegister">
                        {errors.email?.message}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label
                        htmlFor="password"
                        className="LabelFormRegister"
                      >
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
                        isInvalid={errors.password}
                      />
                      <p className="error-txtRegister">
                        {errors.password?.message}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
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
                        isInvalid={errors.confirmPassword}
                      />
                      <p className="error-txtRegister">
                        {errors.confirmPassword?.message}
                      </p>
                    </Col>
                  </Row>
                </div>
               
                <button
                  type="submit"
                  className="Btn-FormRegister"
                >
                  Cadastrar
                </button>
                <p className="end-txtRegister">
                  Já tem conta criada?{' '}
                  <Link className="link-endRegister" to="/login">
                    Clique aqui
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <div>
            <p className="govTxt">
              © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado
              do Ceará
            </p>
          </div>
        </Row>
      </div>
    </>
  )
}

export default RegisterUser
