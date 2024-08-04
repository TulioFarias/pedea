import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import apiPEDEA from '../../../../../../services/api';
import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/editModalDataExplorerCSV.scss';

function EditDataExplorerCSV({ show, handleCloseModalCSV }) {
  const [files, setFiles] = useState([]);
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

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
        const { data } = await apiPEDEA.get('/infoDataExplorerCSV');
        setFiles(data);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    }
    getInfoDataExplorer();
  }, []);

  const onSubmitFileUpload = async data => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('file', data.file[0]);

      await toast.promise(
        apiPEDEA.put('/createUpdateCSV', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }),
        {
          pending: 'Enviando...',
          success: 'Arquivo enviado com sucesso!',
          error: 'Erro ao enviar o arquivo'
        }
      );

      resetFileUpload();
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error);
      resetFileUpload();
    }
  };

  const onSubmitFileUpdate = async data => {
    console.log(data.path)

    try {
      await toast.promise(
        apiPEDEA.put('/updateDataExplorerCSV', { 
          fileName: data.fileName
        }),
        {
          pending: 'Enviando dados...',
          success: 'Dados enviados com sucesso!',
          error: 'Erro ao enviar dados.'
        }
      )
     
      resetFileUpdate();
      handleCloseModalCSV();
    } catch (error) {
      console.error('Erro ao atualizar o arquivo:', error);
      toast.error('Erro ao atualizar o arquivo');
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
    <Modal
      show={show}
      onHide={handleCloseModalCSV}
      id="ContainerModalEditDataExplorerCSV"
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
                  <option key={file.path} value={file.path}>
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
  );
}

EditDataExplorerCSV.propTypes = {
  show: PropTypes.bool.isRequired,
  handleCloseModalCSV: PropTypes.func.isRequired
};

export default EditDataExplorerCSV;