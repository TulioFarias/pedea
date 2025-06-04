import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import * as Yup from 'yup';
import { useSelector } from 'react-redux'
import apiPEDEA from '../../../../../../services/api';
import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/editModalDataExplorerCSV.scss';

function EditDataExplorerCSV({ show, handleCloseModalCSV,handleTableUpdate }) {
  const toast = useRef(null);
  const [files, setFiles] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const userData = useSelector((state) => state.userInfoSlice.infoUser)
    const { id: loggedInUserId } = userData
    const [user, setUser] = useState([])

  const schemaFileUpload = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    file: Yup.mixed().required('Arquivo obrigatório')
  });

  const schemaFileUpdate = Yup.object().shape({
    fileName: Yup.string().required('Campo obrigatório'),
    confirmation: Yup.boolean().oneOf([true], 'A confirmação do envio é obrigatória.')
  });

  const {
    register: registerFileUpload,
    handleSubmit: handleSubmitFileUpload,
    reset: resetFileUpload,
    formState: { errors: errorsFileUpload }
  } = useForm({
    resolver: yupResolver(schemaFileUpload)
  });

  const {
    register: registerFileUpdate,
    handleSubmit: handleSubmitFileUpdate,
    reset: resetFileUpdate,
    formState: { errors: errorsFileUpdate }
  } = useForm({
    resolver: yupResolver(schemaFileUpdate)
  });

  useEffect(() => {
    async function getInfoDataExplorer() {
      try {
        const { data } = await apiPEDEA.get('/getAllCSVUpdate');
        setFiles(data);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
        toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao buscar arquivos', life: 3000 });
      }
    }
    getInfoDataExplorer();


     async function loadUserData() {
            try {
              const { data } = await apiPEDEA.get('/admin')
              const loggedInUser = data.find((user) => user.id === loggedInUserId)
              if (loggedInUser) setUser(loggedInUser)
            } catch (error) {
              console.error('Erro ao carregar usuário:', error)
            }
          }
          loadUserData()
  }, [loggedInUserId]);

  const onSubmitFileUpload = async (data) => {
    try {
      toast.current?.show({ severity: 'info', summary: 'Enviando...', detail: 'Aguarde um momento', life: 3000 });

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('file', data.file[0]);
      formData.append('user_id', loggedInUserId)

      await apiPEDEA.post('/createUpdateCSV', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo enviado com sucesso!', life: 3000 });
      resetFileUpload();
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar o arquivo', life: 3000 });
      resetFileUpload();
    }
  };

  const onSubmitFileUpdate = async (data) => {
    try {
      toast.current?.show({ severity: 'info', summary: 'Enviando dados...', life: 3000 });

      await apiPEDEA.put('/updateDataExplorerCSV', {
        fileName: data.fileName
      });

      toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Dados enviados com sucesso!', life: 3000 });
      resetFileUpdate();
      handleCloseModalCSV();
      handleTableUpdate()
    } catch (error) {
      console.error('Erro ao atualizar o arquivo:', error);
      toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar o arquivo', life: 3000 });
      resetFileUpdate();
    }
  };

  const handleFilePathChange = (e) => {
    setSelectedFilePath(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsConfirmed(e.target.checked);
  };

  return (
    <>
      <Toast ref={toast} />
      <Modal
        show={show}
        onHide={handleCloseModalCSV}
        id="ContainerModalEditDataExplorerCSV"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Informação do Explorer de Dados</Modal.Title>
        </Modal.Header>
        <Modal.Body className='AllContainersCSV'>
          <p>⚠️ : Antes de enviar o arquivo csv, verifique se o template esteja igual ao exemplo.csv, envie o arquivo nos campos abaixo.</p>

          <div className='containerSendFileCSV'>
            <Form onSubmit={handleSubmitFileUpload(onSubmitFileUpload)}>
              <Form.Group controlId="name">
                <Form.Label className='LabelCSVFile'>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  {...registerFileUpload('name')}
                  placeholder='Digite um nome para o arquivo'
                  isInvalid={errorsFileUpload.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errorsFileUpload.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="file">
                <Form.Label className='LabelCSVFile'>Arquivo .csv :</Form.Label>
                <Form.Control
                  type="file"
                  {...registerFileUpload('file')}
                  isInvalid={errorsFileUpload.file}
                />
                <Form.Control.Feedback type="invalid">
                  {errorsFileUpload.file?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className='BtnFileSubmit'
              >
                Enviar arquivo
              </Button>
            </Form>
          </div>

          <p>⚠️ : Verifique o arquivo que foi enviado e selecione o nome do arquivo, confirme se o for o aquivo e envie para atualização dos dados a partir do arquivo .csv selecionado.</p>

          <div className='containerSendUpdate'>
            <Form onSubmit={handleSubmitFileUpdate(onSubmitFileUpdate)}>
              <Form.Group controlId="fileName">
                <Form.Label className='LabelCSVFile'>Selecione o caminho do arquivo:</Form.Label>
                <Form.Control
                  as="select"
                  {...registerFileUpdate('fileName')}
                  onChange={handleFilePathChange}
                  isInvalid={errorsFileUpdate.fileName}
                >
                  <option value="">Selecione um arquivo</option>
                  {files.map(file => (
                    <option key={file.id} value={file.path}>
                      {file.path}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errorsFileUpdate.fileName?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="confirmation" className='inputCheckBox'>
                <Form.Check
                  type="checkbox"
                  label="Confirmo o envio do arquivo"
                  {...registerFileUpdate('confirmation')}
                  onChange={handleCheckboxChange}
                  isInvalid={errorsFileUpdate.confirmation}
                />
                <Form.Control.Feedback type="invalid">
                  {errorsFileUpdate.confirmation?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                disabled={!isConfirmed}
                className='BtnSendUpdate'
              >
                Atualizar
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

EditDataExplorerCSV.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseModalCSV: PropTypes.func.isRequired,
  handleTableUpdate: PropTypes.func.isRequired
};

export default EditDataExplorerCSV;
