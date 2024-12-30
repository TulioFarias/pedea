import React, { useState } from 'react';
import '../../sass/login/loginSystem.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import backIcon from '../../assets/icons/backicon.png';
import logo from '../../assets/img/pedea-logo.png';
import api from '../../services/api';
import { login } from '../../utils/redux/user/actions';
import RecoverPasswordModal from './RecoverPasswordModal';
import SplashScreen from './splash';
import Snackbar from '@mui/material/Snackbar';

function LoginSystem() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const changeForm = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Digite um email válido.')
      .required('O email é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    navigate('/');
  };

  const onSubmit = async (data) => {
    try {
      setSnackbarSeverity('info');
      setSnackbarMessage('Verificando os dados...');
      setSnackbarOpen(true);

      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      });

      setSnackbarSeverity('success');
      setSnackbarMessage('Login realizado com sucesso!');
      setSnackbarOpen(true);

      dispatch(login(response.data));

      setLoading(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2500);
    } catch (error) {
      const errorMessage = error.response?.data?.error
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <SplashScreen />; 
  }

  return (
    <>
      <div className="container-form">
        <button className="btnBack" onClick={handleBack}>
          <img src={backIcon} />
        </button>
        <img src={logo} />

        <Form onSubmit={handleSubmit(onSubmit)} className="customBody-form">
          <h1 className="titleLogin">Sistema de Administração</h1>
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
              isInvalid={!!errors.email}            
            />
            <p className="error-txt">{errors.email?.message}</p>
          </div>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="IconVisibility"
          >
            {showPassword ? (
              <VisibilityRoundedIcon />
            ) : (
              <VisibilityOffRoundedIcon />
            )}
          </button>

          <div className="custom-info">
            <Form.Label htmlFor="password" className="LabelForm">
              Senha:
            </Form.Label>
            <Form.Control
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="InputForm"
              id="password"
              name="password"
              value={form.password}
              onChange={changeForm}
              isInvalid={!!errors.password}
              
            />

            <p className="error-txt">{errors.password?.message}</p>
          </div>

          <Link className="RetrieveAccLink" onClick={() => setShow(true)}>
            Esqueceu sua senha?
          </Link>
        

          <button
            type="submit"
            className="Btn-Form"
            formNoValidate
          >
            Entrar
            <ArrowRightAltRoundedIcon className="iconArrow" />
          </button>

          <p className="end-txt">
            Não tem cadastro?{' '}
            <Link href="#" className="link-end" to="/cadastro">
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

      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '300px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginSystem;


