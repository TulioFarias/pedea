import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import backIcon from '../../assets/icons/backicon.png';
import logo from '../../assets/img/pedea-logo.png';
import '../../sass/login/loginSystem.scss';
import api from '../../services/api';
import { login } from '../../utils/redux/user/actions';
import RecoverPasswordModal from './RecoverPasswordModal';
import SplashScreen from './splash';

function LoginSystem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [showRecover, setShowRecover] = useState(false);
  const [form, setForm] = useState({ cpf: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    cpf: Yup.string().required('O CPF é obrigatório.'),
    password: Yup.string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBack = () => {
    navigate('/');
  };

  const maskCPF = (value) => {
    const numeric = value.replace(/\D/g, '').slice(0, 11);
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const onSubmit = async (data) => {
    const cpfSemMascara = data.cpf.replace(/\D/g, '');
    try {
      toast.current.show({
        severity: 'info',
        summary: 'Verificando',
        detail: 'Verificando os dados...',
        life: 2000,
      });

      const response = await api.post('/login', {
        cpf: cpfSemMascara,
        password: data.password,
      });

      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Login realizado com sucesso!',
        life: 2000,
      });

      dispatch(login(response.data));

      setLoading(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2500);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Erro no login';
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: errorMessage,
        life: 4000,
      });
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="container-form">
        <button className="btnBack" onClick={handleBack}>
          <img src={backIcon} alt="Voltar" />
        </button>
        <img src={logo} alt="Logo PEDEA" />

        <form onSubmit={handleSubmit(onSubmit)} className="customBody-form">
          <h3 className="titleLogin">Sistema de Administração</h3>
          <hr className="hrLoginAndRegister" />

          <p>Realize o seu login preenchendo os campos abaixo:</p>
          <div className="containerInputs">
            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="cpf"
                  {...register('cpf')}
                  value={form.cpf}
                  onChange={(e) => {
                    const masked = maskCPF(e.target.value);
                    setForm({ ...form, cpf: masked });
                    setValue('cpf', masked);
                  }}
                  className={errors.cpf ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <label htmlFor="cpf">CPF</label>
              </FloatLabel>
              {errors.cpf && <small className="p-error">{errors.cpf.message}</small>}
            </div>

            <div className="custom-info">
              <FloatLabel> 
                  <InputText
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setValue('password', e.target.value);
                    }}
                    className={errors.password ? 'p-invalid' : ''}
                    style={{ width: '100%', borderRadius: '10px' }}
                  />
                  <label htmlFor="password">Senha</label>
                  <span
                    className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '0.75rem',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      color: '#6c757d',
                    }}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
            
                {errors.password && <small className="p-error">{errors.password.message}</small>}
              </FloatLabel>
            </div>
          </div>

          <Link className="esqueceuSenha" onClick={() => setShowRecover(true)}>
            Esqueceu sua senha?
          </Link>

          <Button
            type="submit"
            className="Btn-Form"
            label="Entrar"
            icon={<ArrowRightAltRoundedIcon className="iconArrow" />}
            iconPos="right"
          />

          <p className="end-txt">
            Não tem cadastro?{' '}
            <Link to="/cadastro" className="link-end">
              Clique aqui
            </Link>
          </p>
        </form>
        <p className="govTxt">
          © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado do Ceará
        </p>
      </div>
      <RecoverPasswordModal show={showRecover} setShow={setShowRecover} />
    </>
  );
}

export default LoginSystem;
