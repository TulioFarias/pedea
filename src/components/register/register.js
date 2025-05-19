import '../../sass/Register/register.scss'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import backIcon from '../../assets/icons/backicon.png'
import logo from '../../assets/img/pedea-logo.png'
import api from '../../services/api'
import { createUser } from '../../utils/redux/user/actions'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function RegisterUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [snackbar, setSnackbar] = useState({ 
     open: false,
     message: '', 
     severity: '' 
    });


  const changeForm = async e => {
    const { name, value } = e.target

    const uppercasedFields = ['name'];

    const formattedValue = uppercasedFields.includes(name)
      ? value.toUpperCase()
      : value;
      setForm({ ...form, [name]: formattedValue })
  }

  const dispatch = useDispatch()
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    cpf: Yup.string().required('O cpf é obrigatório.'),
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


  const onSubmit = async (data) => {
    const cpfSemMascara = data.cpf.replace(/\D/g, '');

    try {
      const registerUser = await api.post('/register', {
        name: data.name,
        cpf: cpfSemMascara,
        email: data.email,
        password: data.password
      });

      dispatch(createUser(registerUser));

      setSnackbar({
        open: true,
        message: 'Usuário cadastrado com sucesso.',
        severity: 'success'
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Não foi possível fazer o cadastro.';
      console.log(error)
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  const maskCPF = (value) => {
    const numeric = value.replace(/\D/g, '').slice(0, 11);
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleBack = () => {
    navigate('/login');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <div className="container-formRegister">
       
          <div>
            <button className="btnBackRegister" onClick={handleBack}>
              <img src={backIcon} alt="Back" />
            </button>
          </div>
          <img src={logo} alt="Logo" className="pedeaImg" />
        
   
      
            <div className="containerRegisterUsers">
              <h3 className="titleRegister">Cadastro Portal Admin</h3>
              <hr className="hrLoginAndRegister" />
              <h8 className="txtRegister">
                Para realizar seu cadastro ao sistema de administração da PEDEA,
                preencha os campos abaixo:
              </h8>
              <Form onSubmit={handleSubmit(onSubmit)} className="formRegister">
                <div className="containerUserInfo">
             
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
             
                    <Col>
                      <Form.Label htmlFor="cpf" className="LabelFormRegister">
                       CPF:
                      </Form.Label>
                      <Form.Control
                        {...register('cpf')}
                        type="text"
                        className="InputFormRegister"
                        id="cpf"
                        name="cpf"
                        value={form.cpf}
                        onChange={(e) => {
                          const masked = maskCPF(e.target.value);
                          changeForm({ target: { name: 'cpf', value: masked } });
                        }}
                        placeholder="000.000.000-00"
                        isInvalid={errors.cpf}
                      />
                      <p className="error-txtRegister">
                        {errors.cpf?.message}
                      </p>
                    </Col>
                
               
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
               
                </div>
               
                <button
                  type="submit"
                  className="Btn-FormRegister"
                >
                  Cadastrar
                </button>
               
              </Form>
            </div>
      
     
  
          <div>
            <p className="govTxt">
              © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado
              do Ceará
            </p>
          </div>
      

        <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '300px' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      </div>
    </>
  )
}

export default RegisterUser
