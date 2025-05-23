import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Snackbar, Alert } from '@mui/material';
import apiPEDEA from '../../../../../services/api'
import { useTranslation } from 'react-i18next'

function ModalSendFileCsv({ showModalFile, setShowModalFile }) {
  const { t } = useTranslation()
  const [data, setData] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: '',
});

console.log(showModalFile)
  

  const schema = Yup.object().shape({
    confirmSend: Yup.bool().oneOf(
      [true],
      'Confirme o envio de dados para prosseguir'
    ),
    path: Yup.string().required('Selecione um caminho para prosseguir')
  })

  const closeModal = () => {
    setShowModalFile(false)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    async function loadDataCSVRotulos() {
      try {
        const { data } = await apiPEDEA.get('/getAllRotulosCSVBilingue')
        if (data) {
          setData(data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadDataCSVRotulos()
  }, [])

  const onSubmit = async (formData) => {
    try {
        setSnackbar({
            open: true,
            message: 'Enviando dados...',
            severity: 'info',
        });

        await apiPEDEA.post('/createRotulosDataCSV', { fileName: formData.path });

        setSnackbar({
            open: true,
            message: 'Dados enviados com sucesso!',
            severity: 'success',
        });

        reset();
        closeModal();
    } catch (error) {
        console.error('Erro ao enviar dados:', error);

        const errorMessage =
            error.response?.data?.message ||
            error.response?.data?.details ||
            'Erro desconhecido';

        setSnackbar({
            open: true,
            message: `Erro: ${errorMessage}`,
            severity: 'error',
        });
    }
};

  

  return (
    <>
      <Modal
        show={showModalFile}
        onHide={closeModal}
        id="ContainerModalConfirmSendFile"
      >
        <Modal.Header closeButton>
          <Modal.Title className="titleModalFAQ">
            Adicionar dados do arquivo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalFAQEdit">
          <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formFileName">
                    <Form.Label className="LabelCSV">
                       {t(" Nome:")}
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t("Digite o nome do arquivo")}
                        {...register('name')}
                        isInvalid={!!errors.name}
                        className="inputCSV"
                    />
                    <Form.Control.Feedback type="invalid" className="txtErrorPassword">
                        {errors.name?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                

                <Form.Group controlId="formFileCSV" className="formGroupTwo">
                    <Form.Label className="LabelCSV">{t("Arquivo CSV:")}</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".csv"
                        {...register('file')}
                        isInvalid={!!errors.file}
                        className="inputCSV"
                    />
                    <Form.Control.Feedback type="invalid" className="txtErrorPassword">
                        {errors.file?.message}
                    </Form.Control.Feedback>
                </Form.Group>

               <Button variant="primary" type="submit" className="BtnSubmitRotulosCSV">
                        {t("Enviar")}
                    </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnsClose" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        
    >
        <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '300px' }} 
        >
            {snackbar.message}
        </Alert>
    </Snackbar>

    </>
  )
}

ModalSendFileCsv.propTypes = {
    showModalFile: PropTypes.bool.isRequired,
    setShowModalFile: PropTypes.func.isRequired
}

export default ModalSendFileCsv
