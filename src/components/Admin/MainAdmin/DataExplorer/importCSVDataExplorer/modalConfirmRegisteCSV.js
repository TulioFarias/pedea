import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import apiPEDEA from '../../../../../services/api'
import '../../../../../sass/admin/DataExplorer/modalsDataExplorer/confirmsendDataExplorer.scss'

function ModalConfirmAddDataExplorer({ showModalConfirm, setModalConfirm }) {
  const [data, setData] = useState([])
  

  const schema = Yup.object().shape({
    confirmSend: Yup.bool().oneOf(
      [true],
      'Confirme o envio de dados para prosseguir'
    ),
    path: Yup.string().required('Selecione um caminho para prosseguir')
  })

  const closeModal = () => {
    setModalConfirm(false)
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
        const { data } = await apiPEDEA.get('/getAllRotulosCSV')
        if (data) {
          setData(data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    loadDataCSVRotulos()
  }, [])

  const onSubmit = async formData => {
    try {
      await toast.promise(
        apiPEDEA.post('/createValueDataExplorer', { fileName: formData.path }),
        {
          pending: 'Enviando dados...',
          success: 'Dados enviados com sucesso!',
          error: 'Erro ao enviar dados.'
        }
      )

      reset()
      closeModal()
    } catch (error) {
      console.error('Erro ao enviar dados:', error)
      toast.error('Erro ao enviar dados.')
    }
  }

  return (
    <>
      <Modal
        show={showModalConfirm}
        onHide={closeModal}
        id="ContainerModalConfirmSend"
      >
        <Modal.Header closeButton>
          <Modal.Title className="titleModalFAQ">
            Adicionar dados do arquivo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalFAQEdit">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="containerInputsFAQEdit">
              <Form.Group controlId="formPathSelect">
                <Form.Label>Selecione o caminho do arquivo</Form.Label>
                <Form.Control
                  as="select"
                  {...register('path')}
                  className="inputSelect"
                >
                  <option value="" className="optionValueSelect">
                    Selecionar arquivo enviado...
                  </option>
                  {data.map(item => (
                    <option
                      key={item.id}
                      value={item.path}
                      className="optionValueSelect"
                    >
                      {item.path}
                    </option>
                  ))}
                </Form.Control>
                <p className="txtErrorFAQ">{errors.path?.message}</p>
              </Form.Group>
            </div>

            <p className="txt">
              ⚠️ : Antes de enviar dados do arquivo .csv para o banco de dados,
              por favor verifique se todos os dados estão na ordem do exemplo
              corretamente.
            </p>
            <p className="txt">Tem certeza que deseja enviar os dados?</p>

            <Form.Group controlId="formConfirmSend">
              <Form.Check
                type="checkbox"
                label="Confirmo que desejo enviar dados do arquivo."
                {...register('confirmSend')}
              />
              <p className="txtErrorFAQ">{errors.confirmSend?.message}</p>
            </Form.Group>

            <Button type="submit" className="btnsSubmitSend">
              Adicionar ao banco de dados
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btnsClose" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalConfirmAddDataExplorer.propTypes = {
  showModalConfirm: PropTypes.bool.isRequired,
  setModalConfirm: PropTypes.func.isRequired
}

export default ModalConfirmAddDataExplorer
