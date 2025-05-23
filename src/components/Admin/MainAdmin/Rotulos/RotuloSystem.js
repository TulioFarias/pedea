import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'
import apiPEDEA from '../../../../services/api'
import ContainerInfoRotulos from './changeTableView/TableInfoRotulos'
import IfKeyExist from './modalsRotulos/modalKeyExist'
import CreateRotulosCSV from './csvRotulos/createCSVRotulos'
import KeyIcon from '@mui/icons-material/Key';
import { useSelector } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';



function CreateRotulosSystem() {

  const { t } = useTranslation()
  const [dataInfoKey, setDataInfoKey] = useState([])
  const [tableUpdated, setTableUpdated] = useState(false)
  const [showModalIfKey, setShowModalIfKey] = useState(false)
  const [editItemId, setEditItemId] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [user, setUser] = useState([]);
  const userData = useSelector(state => state.userInfoSlice.infoUser);
  const { id: loggedInUserId } = userData;

  const handleTableUpdate = () => {
    setTableUpdated(prev => !prev)
  }

  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    pt_br: Yup.string().required('Esse campo é obrigatório.'),
    en: Yup.string().required('Esse campo é obrigatório.'),
    es: Yup.string().required('Esse campo é obrigatório.')
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })



  const showModalToUpdate = () => {
    setShowModalIfKey(true)
  }

  const onSubmit = async (data, event) => {
 
    try {
      const foundItem = dataInfoKey.find(item => item.key === data.key);

      if (!foundItem) {
          const APIResponse = await apiPEDEA.post('/rotulos', {
              key: data.key,
              pt_br: data.pt_br,
              en: data.en,
              es: data.es,
              user_id: loggedInUserId
          });

          setSnackbar({
              open: true,
              message: 'Cadastrado com sucesso.',
              severity: 'success'
          });
      } else {
          setSnackbar({
              open: true,
              message: 'Chave já cadastrada.',
              severity: 'error'
          });
          showModalToUpdate();
      }

      reset();
      handleTableUpdate();
      event.preventDefault();
  } catch (error) {
      console.error(error);
      setSnackbar({
          open: true,
          message: 'Erro ao processar a solicitação.',
          severity: 'error'
      });
  }
  }

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/getRotulosBilingue')
        setDataInfoKey(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])


  return (
    <Container fluid className="containerWrapperOptions">
      <div className="ContainerAllRotulosOptions">
        <div className="ContainerAddInfoRotulos">
          <Form className="containerInfos" onSubmit={handleSubmit(onSubmit)}>
            <div className="titleRegisterRotulo">
              <p>{t("Preencha os campos abaixo para cadastrar um rótulo:")}</p>
            </div>

            <div className="containersLabelsFormRegisterRotulos">
              <Form.Group>
                <Form.Label className="LabelRotulos">
                 {t(" Chave:" )}
                  <KeyIcon/>
                  
                </Form.Label>
                <Form.Control
                  type="text"
         
                  {...register('key')}
                  className="InputRotulos"
                  isInvalid={errors.key}
                  placeholder={t('Digite um nome para chave')}
                />
                <p className="txtErrorPassword">{errors.key?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                  PT-BR
                  <Flag country="BR" />
                </Form.Label>
                <Form.Control
                  type="text"
         
                  {...register('pt_br')}
                  className="InputRotulos"
                  isInvalid={errors.pt_br}
                  placeholder={t('Digite nome em português')}
                />
                <p className="txtErrorPassword">{errors.pt_br?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                  EN 
                  <Flag country="US" />
                </Form.Label>
                <Form.Control
                  type="text"
         
                  {...register('en')}
                  className="InputRotulos"
                  isInvalid={errors.en}
                  placeholder={t('Digite nome em inglês')}
                />
                <p className="txtErrorPassword">{errors.en?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                 ES
                 <Flag country="ES" />
                </Form.Label>
                <Form.Control
                  type="text"
         
                  {...register('es')}
                  className="InputRotulos"
                  isInvalid={errors.es}
                  placeholder={t('Digite um nome em espanhol')}
                />
                <p className="txtErrorPassword">{errors.es?.message}</p>
              </Form.Group>

              <Button
                variant="secondary"
                className="btnSubmitAddRotulos"
                type="submit"
              >
                {t("Cadastrar")}
              </Button>
            </div>

            <hr/>
            
              <CreateRotulosCSV/>
          </Form>
          
       

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


      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '300px' }}>
            {snackbar.message}
        </Alert>
    </Snackbar>
    </Container>
  )
}

export default CreateRotulosSystem
