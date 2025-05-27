import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import apiPEDEA from '../../../../../services/api';
import { useTranslation } from 'react-i18next';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import ShowAndEditChangeLog from './showandeditChangeLog';
import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss';
import { useSelector } from 'react-redux';

function AddInfoChangeLog() {
  const { t } = useTranslation();
  const toast = useRef(null);
   const [user, setUser] = useState([]);
    const userData = useSelector(state => state.userInfoSlice.infoUser);
    const { id: loggedInUserId } = userData;

  const schema = Yup.object().shape({
    version: Yup.string()
      .matches(/^\d+$/, t('A versão deve conter apenas números.'))
      .required(t('A numeração da versão é obrigatória.')),
    message: Yup.string().required(t('A mensagem é obrigatória.')),
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    toast.current.show({
      severity: 'info',
      summary: t('Aguarde'),
      detail: t('Adicionando...'),
      life: 2000,
    });

    try {
      await apiPEDEA.post('/addInfoEvolution', {
        version: data.version,
        message: data.message,
        user_id: loggedInUserId
      });

      toast.current.show({
        severity: 'success',
        summary: t('Sucesso'),
        detail: t('Registro de atualização criado com sucesso!'),
        life: 3000,
      });

      reset();
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: t('Erro'),
        detail: t('Erro ao adicionar novo registro.'),
        life: 4000,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await apiPEDEA.get('/admin');
        const loggedInUser = data.filter(user => user.id === loggedInUserId);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    loadUserData();
  }, [loggedInUserId]);

  return (
    <div className='FormsContainerAddChangeLog'>
      <Toast ref={toast} />

      <form  onSubmit={handleSubmit(onSubmit)}>
        <p>{t('Para adicionar um novo registro de atualização, preencha os campos abaixo:')}</p>

        <div className="containerInputsChangeLog">
          <FloatLabel>
            <InputText
              id="version"
              {...register('version')}
              onChange={(e) => setValue('version', e.target.value)}
              className={`inputChangeLog valueInputCustom ${errors.version ? 'p-invalid' : ''}`}
              style={{ width: '100%', borderRadius: '10px' }}
              keyfilter="int"
            />
            <label htmlFor="version">{t('Digite o número da versão')}</label>
          </FloatLabel>

          <FloatLabel>
            <InputTextarea
              id="message"
              {...register('message')}
              onChange={(e) => setValue('message', e.target.value)}
              rows={4}
              className={`inputChangeLog valueInputCustom ${errors.message ? 'p-invalid' : ''}`}
              style={{ width: '100%' , borderRadius: '10px' }}
            />
            <label htmlFor="message">{t('Escreva a mensagem de atualização')}</label>
          </FloatLabel>
        </div>

        <Button type="submit" label={t('Registrar nova atualização')} className="btnSubmitChangeLog p-button-primary" />
      </form>

      <ShowAndEditChangeLog />
    </div>
  );
}

export default AddInfoChangeLog;
