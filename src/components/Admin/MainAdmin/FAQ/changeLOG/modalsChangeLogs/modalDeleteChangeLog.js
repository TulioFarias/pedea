import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import '../../../../../../sass/admin/FAQ/changeLOG/ChangeLogModal.scss'
import apiPEDEA from '../../../../../../services/api'
function ModalChangeLogDelete({
  openModalDelete,
  setOpenModalDelete,
  idEditValueLog
}) {
  const schema = Yup.object().shape({
    confirmDelete: Yup.bool().oneOf(
      [true],
      'Confirme a exclusão para prosseguir'
    )
  })

  const closeModal = () => {
    setOpenModalDelete(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    try {
      const payload = {
        id: idEditValueLog
      }

      const response = await toast.promise(
        apiPEDEA.delete('/deleteChangeLog', { data: payload }),
        {
          pending: 'Excluindo...',
          success: 'Registro de atualização excluido com sucesso!',
          error:
            'Ocorreu um erro, infelizmente não foi possível excluir os dados.'
        }
      )

      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      show={openModalDelete}
      onHide={closeModal}
      id="ContainerModalChangeLogDelete"
    >
      <Modal.Header closeButton>
        <Modal.Title className="titleModalFAQ">
          Excluir a atualização ativa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalFAQEdit">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">
            {' '}
            ⚠️ : A versão de atualização excluida não pode ser recuperada.
          </p>
          <p className="txt">
            Tem certeza que deseja excluir a pergunta permanentemente?
          </p>

          <div className="containerInputsFAQEdit">
            <Form.Group controlId="formConfirmDelete">
              <Form.Check
                type="checkbox"
                label="Confirmo que desejo excluir esta pergunta"
                {...register('confirmDelete')}
              />
              <p className="txtErrorFAQ">{errors.confirmDelete?.message}</p>
            </Form.Group>
          </div>

          <Button variant="danger" type="submit" className="btnsSubmitDelete">
            Excluir
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

ModalChangeLogDelete.propTypes = {
  openModalDelete: PropTypes.bool.isRequired,
  setOpenModalDelete: PropTypes.func.isRequired,
  idEditValueLog: PropTypes.number.isRequired
}

export default ModalChangeLogDelete
