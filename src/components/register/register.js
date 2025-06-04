import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import backIcon from '../../assets/icons/backicon.png';
import logo from '../../assets/img/pedea-logo.png';
import sema from '../../assets/img/logo-sema-white.png';
import '../../sass/Register/register.scss';

import api from '../../services/api';
import { createUser } from '../../utils/redux/user/actions';

function RegisterUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useRef(null);

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório.'),
    cpf: Yup.string().required('O CPF é obrigatório.'),
    email: Yup.string().email('Digite um email válido.').required('O email é obrigatório.'),
    password: Yup.string().required('A senha é obrigatória.').min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.')
      .required('Confirme sua senha.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const maskCPF = (value) => {
    const numeric = value.replace(/\D/g, '').slice(0, 11);
    return numeric
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const changeForm = (name, value) => {
    const uppercasedFields = ['name'];
    const formattedValue = uppercasedFields.includes(name) ? value.toUpperCase() : value;
    setForm((prev) => ({ ...prev, [name]: formattedValue }));
    setValue(name, formattedValue, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    const cpfSemMascara = data.cpf.replace(/\D/g, '');

    try {
      const registerUser = await api.post('/register', {
        name: data.name,
        cpf: cpfSemMascara,
        email: data.email,
        password: data.password,
      });

      dispatch(createUser(registerUser));

      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário cadastrado com sucesso.',
        life: 3000,
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Não foi possível fazer o cadastro.';
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: errorMessage,
        life: 4000,
      });
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="container-formRegister">
        <button className="btnBackRegister" onClick={handleBack}>
          <img src={backIcon} alt="Voltar" />
        </button>

         <div className='containerLogosRegister'>
          <img src={sema} alt="Logo PEDEA" className='logo-sema' />
          <img src={logo} alt="Logo PEDEA" className='logo-pedea'/>

        </div>

        <div className="containerRegisterUsers">
          <h3 className="titleRegister">Cadastro Portal Admin</h3>
          <hr className="hrLoginAndRegister" />
          <p className="txtRegister">
            Para realizar seu cadastro ao sistema de administração da PEDEA,
            preencha os campos abaixo:
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="formRegister">
            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="name"
                  {...register('name')}
                  value={form.name}
                  onChange={(e) => changeForm('name', e.target.value)}
                  className={errors.name ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <label htmlFor="name">Nome</label>
              </FloatLabel>
              {errors.name && <small className="p-error">{errors.name.message}</small>}
            </div>

            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="cpf"
                  {...register('cpf')}
                  value={form.cpf}
                  onChange={(e) => {
                    const masked = maskCPF(e.target.value);
                    changeForm('cpf', masked);
                  }}
                  className={errors.cpf ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                  placeholder="000.000.000-00"
                />
                <label htmlFor="cpf">CPF</label>
              </FloatLabel>
              {errors.cpf && <small className="p-error">{errors.cpf.message}</small>}
            </div>

            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="email"
                  {...register('email')}
                  value={form.email}
                  onChange={(e) => changeForm('email', e.target.value)}
                  className={errors.email ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                  placeholder="exemplo@email.com"
                />
                <label htmlFor="email">Email</label>
              </FloatLabel>
              {errors.email && <small className="p-error">{errors.email.message}</small>}
            </div>

            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="password"
                  type="password"
                  {...register('password')}
                  value={form.password}
                  onChange={(e) => changeForm('password', e.target.value)}
                  className={errors.password ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                  placeholder="Mínimo de 6 caracteres..."
                />
                <label htmlFor="password">Senha</label>
              </FloatLabel>
              {errors.password && <small className="p-error">{errors.password.message}</small>}
            </div>

            <div className="custom-info">
              <FloatLabel>
                <InputText
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  value={form.confirmPassword}
                  onChange={(e) => changeForm('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? 'p-invalid' : ''}
                  style={{ width: '100%', borderRadius: '10px' }}
                />
                <label htmlFor="confirmPassword">Confirmar Senha</label>
              </FloatLabel>
              {errors.confirmPassword && (
                <small className="p-error">{errors.confirmPassword.message}</small>
              )}
            </div>


            <div className='containerBtnAndLink'>

              <Button
                type="submit"
                className="Btn-Form"
                label="Cadastrar"
                style={{ marginTop: '1rem', borderRadius: '10px' }}
              />

              <p className="end-txt">
                Já tem cadastro?{' '}
                <Link to="/login" className="link-end">
                  Clique aqui
                </Link>
              </p>

            </div>


          </form>
        </div>

        <p className="govTxt">
          © 2024 - Secretaria do Meio Ambiente e Mudança de Clima do Estado do Ceará
        </p>
      </div>
    </>
  );
}

export default RegisterUser;
