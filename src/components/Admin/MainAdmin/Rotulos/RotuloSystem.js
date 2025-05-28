import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';
import KeyIcon from '@mui/icons-material/Key';
import { useSelector } from 'react-redux';
import apiPEDEA from '../../../../services/api';
import ContainerInfoRotulos from './changeTableView/TableInfoRotulos';
import IfKeyExist from './modalsRotulos/modalKeyExist';
import CreateRotulosCSV from './csvRotulos/createCSVRotulos';
import '../../../../sass/admin/Rotulos/rotulos.scss';

function CreateRotulosSystem() {
  const { t } = useTranslation();
  const toast = useRef(null);
  const [dataInfoKey, setDataInfoKey] = useState([]);
  const [tableUpdated, setTableUpdated] = useState(false);
  const [showModalIfKey, setShowModalIfKey] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const userData = useSelector(state => state.userInfoSlice.infoUser);
  const { id: loggedInUserId } = userData;

  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    pt_br: Yup.string().required('Esse campo é obrigatório.'),
    en: Yup.string().required('Esse campo é obrigatório.'),
    es: Yup.string().required('Esse campo é obrigatório.')
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleTableUpdate = () => {
    setTableUpdated(prev => !prev);
  };

  const showModalToUpdate = () => {
    setShowModalIfKey(true);
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
      const foundItem = dataInfoKey.find(item => item.key === data.key);

      if (!foundItem) {
        await apiPEDEA.post('/rotulos', {
          key: data.key,
          pt_br: data.pt_br,
          en: data.en,
          es: data.es,
          user_id: loggedInUserId
        });

        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastrado com sucesso.' });
      } else {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Chave já cadastrada.' });
        showModalToUpdate();
      }

      reset();
      handleTableUpdate();
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao processar a solicitação.' });
    }
  };

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/getRotulosBilingue');
        setDataInfoKey(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }
    loadRotulosData();
  }, []);

  return (
    <div className="containerWrapperOptions">
      <Toast ref={toast} />
      <div className="ContainerAllRotulosOptions">
        <div className="containerInfo">
          <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="titleRegisterRotulo">
              <p>{t("Preencha os campos abaixo para cadastrar um rótulo:")}</p>
            </div>

            <div className="containersLabelsFormRegisterRotulos">
         
              <div className="p-float-label label-float-rotulos">
                <InputText 
                id="key" 
                {...register('key')} 
                className={`InputRotulos valueInputCustom ${errors.key ? 'p-invalid' : ''}`} 
                style={{ width: '100%', borderRadius: '10px' }}  />
                <label htmlFor="key">
                  {t("Chave")} <KeyIcon fontSize="small" />
                </label>
                {errors.key && <small className="p-error">{errors.key.message}</small>}
              </div>

      
              <div className="p-float-label label-float-rotulos">
                <InputText 
                id="pt_br" 
                {...register('pt_br')} 
                className={`InputRotulos valueInputCustom ${errors.pt_br ? 'p-invalid' : ''} `}
                style={{ width: '100%', borderRadius: '10px' }} 
                />
                <label htmlFor="pt_br">
                  PT-BR <Flag country="BR" />
                </label>
                {errors.pt_br && <small className="p-error">{errors.pt_br.message}</small>}
              </div>

        
              <div className="p-float-label label-float-rotulos">
                <InputText 
                id="en" {...register('en')} 
                className={`InputRotulos  valueInputCustom ${errors.en ? 'p-invalid' : ''}`} 
                style={{ width: '100%', borderRadius: '10px' }} 
                />
                <label htmlFor="en">
                  EN <Flag country="US" />
                </label>
                {errors.en && <small className="p-error">{errors.en.message}</small>}
              </div>

      
              <div className="p-float-label label-float-rotulos">
                <InputText 
                id="es" 
                {...register('es')} 
                className={`InputRotulos valueInputCustom ${errors.es ? 'p-invalid' : ''}`}
                style={{ width: '100%', borderRadius: '10px' }} 
                 />
                <label htmlFor="es">
                  ES <Flag country="ES" />
                </label>
                {errors.es && <small className="p-error">{errors.es.message}</small>}
              </div>

              <Button
                type="submit"
                label={t("Cadastrar")}
                icon="pi pi-check"
                className="btnSubmitAddRotulos p-button-secondary"
              />
            </div>

            <hr />
            
          </form>

           <CreateRotulosCSV />

          <IfKeyExist
            showModalIfKey={showModalIfKey}
            setShowModalIfKey={setShowModalIfKey}
            handleTableUpdate={handleTableUpdate}
            setEditItemId={setEditItemId}
          />
          
        </div>

        <ContainerInfoRotulos
          tableUpdated={tableUpdated}
          handleTableUpdate={handleTableUpdate}
          setEditItemId={setEditItemId}
          editItemId={editItemId}
        />
      </div>

      
    </div>
  );
}

export default CreateRotulosSystem;
