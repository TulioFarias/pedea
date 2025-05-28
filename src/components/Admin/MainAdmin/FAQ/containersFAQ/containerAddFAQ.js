import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef , useState, useEffect} from 'react';
import '../../../../../sass/admin/FAQ/addfaq.scss';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import apiPEDEA from '../../../../../services/api';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Toast } from 'primereact/toast';
import ShowContainerEditFAQ from './containerEditFAQ';


function AddInfoFAQ() {
  const { t } = useTranslation();
  const toast = useRef(null);
    const [user, setUser] = useState([]);
    const userData = useSelector(state => state.userInfoSlice.infoUser);
    const { id: loggedInUserId } = userData;

  const schema = Yup.object().shape({
    question: Yup.string()
      .max(255, t('A pergunta deve ter no máximo 255 caracteres.'))
      .required(t('A pergunta é obrigatória')),
    answer: Yup.string()
      .max(2000, t('A resposta deve ter no máximo 2000 caracteres.'))
      .required(t('A resposta é obrigatória')),
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
      await apiPEDEA.post('/addFAQ', {
        question: data.question,
        answer: data.answer,
        user_id: loggedInUserId
      });

      toast.current.show({
        severity: 'success',
        summary: t('Sucesso'),
        detail: t('Adicionado com sucesso!'),
        life: 3000,
      });

      reset();
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: t('Erro'),
        detail: t('Error ao adicionar!'),
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
    <div className='FormsContainerAddFAQ'>
      <Toast ref={toast} />
      <form  onSubmit={handleSubmit(onSubmit)}>
        <p>{t('Para adicionar uma nova pergunta e resposta, preencha os campos abaixo:')}</p>


        <div className='containerInputsFAQ'>

          <div className="p-input-icon-left" style={{ width: '100%' }}>
            <i className="pi pi-question" />
            <FloatLabel>
              <InputText
                id="question"
                {...register('question')}
                onChange={(e) => setValue('question', e.target.value)}
                className={`AddinputFAQ valueInputCustom ${errors.question ? 'p-invalid' : ''}`}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <label htmlFor="question">{t('Digite a pergunta')}</label>
            </FloatLabel>
          </div>


          <div className="p-input-icon-left" style={{ width: '100%' }}>
          <i className="pi pi-comment" />
          <FloatLabel>
            <InputTextarea
              id="answer"
              {...register('answer')}
              onChange={(e) => setValue('answer', e.target.value)}
              rows={4}
              className={`AddinputFAQ valueInputCustom ${errors.answer ? 'p-invalid' : ''}`}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <label htmlFor="answer">{t('Digite a resposta')}</label>
          </FloatLabel>
        </div>

        </div>

        <Button type="submit" label={t('Criar nova FAQ')} className="btnSubmitFAQ p-button-primary" />
      </form>

      <ShowContainerEditFAQ/>

    </div>
  );
}

export default AddInfoFAQ;

