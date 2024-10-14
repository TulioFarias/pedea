import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import '../../../../../../sass/admin/DataExplorer/modalsDataExplorer/editModalDataExplorer.scss'
import apiPEDEA from '../../../../../../services/api'

function ModalEditChangeLog({
  openModalEdit,
  setOpenModalEdit,
  idEditValueLog
}) {
  const [valueEditChangeLog, setValueEditChangeLog] = useState({
    version: '',
    message: ''
  })

  // Validação com Regex para garantir que a versão seja numérica
  const schema = Yup.object().shape({
    version: Yup.string()
      .matches(/^\d+$/, 'A versão deve conter apenas números.')
      .required('A versão de atualização é obrigatória.'),
    message: Yup.string().required('A nova mensagem é obrigatória.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const closeModal = () => {
    setOpenModalEdit(false)
  }

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        apiPEDEA.put('/updateChangeLog', {
          id: idEditValueLog,
          version: data.version,
          message: data.message
        }),
        {
          pending: 'Atualizando...',
          success: 'Dados atualizados no banco de dados',
          error: 'Chave não corresponde ao ID fornecido.'
        }
      )
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValueEditChangeLog((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <Modal
      show={openModalEdit}
      onHide={closeModal}
      id="ContainerModalChangeLogEdit"
    >
      <Modal.Header closeButton>
        <Modal.Title className="titleModalChangeLog">
          Editar log de atualização
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalChangeLogEdit">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">
            Edite a versão e a mensagem de atualização abaixo:
          </p>

          <div className="containerInputsChangeLogEdit">
            <Form.Group controlId="formVersion">
              <Form.Label className="labelInputChangeLog">Versão:</Form.Label>
              <Form.Control
                type="number" // Alterado para tipo numérico
                {...register('version')}
                name="version"
                onChange={handleChange}
                isInvalid={!!errors.version}
                onKeyDown={(e) =>
                  ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()
                } // Impede caracteres inválidos
              />
              <p className="txtErrorChangeLog">{errors.version?.message}</p>
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label className="labelInputChangeLog">
                Mensagem de Atualização:
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register('message')}
                name="message"
                onChange={handleChange}
                isInvalid={!!errors.message}
              />
              <p className="txtErrorChangeLog">{errors.message?.message}</p>
            </Form.Group>
          </div>

          <Button className="btnsSubmit" type="submit">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btnsClose" onClick={closeModal}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalEditChangeLog.propTypes = {
  openModalEdit: PropTypes.bool.isRequired,
  setOpenModalEdit: PropTypes.func.isRequired,
  idEditValueLog: PropTypes.number.isRequired
}

export default ModalEditChangeLog

