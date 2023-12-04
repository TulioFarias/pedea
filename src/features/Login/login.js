import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import '../../sass/LoginSystem/loginSystem.scss'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

function LoginSystem() {
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

  const onSubmit = data => console.log(data)
  return (
    <div className="Container-Form">
      <h1>PEDEA TEST</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="containerInfo">
          <div className="custom-info">
            <label className="LabelForm" htmlFor="email">
              Seu email:
            </label>
            <input {...register('email')} className="InputForm" id="email" />
            <p className="error-txt">{errors.email?.message}</p>
          </div>

          <div className="custom-info">
            <label className="LabelForm" htmlFor="password">
              Senha:
            </label>
            <input
              {...register('password')}
              className="InputForm"
              id="password"
            />
            <p className="error-txt">{errors.password?.message}</p>
          </div>

          <button type="submit" className="Btn-Form">
            Entrar
          </button>

          <a>Não possui conta? Cadastre-se aqui</a>
        </form>
      </div>
    </div>
  )
}

export default LoginSystem
