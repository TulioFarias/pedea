import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import '../../../../../sass/admin/FAQ/modalsFAQ.scss'
import apiPEDEA from '../../../../../services/api'

function ModalFAQDelete({ setOpenModalDelete, openModalDelete, idEditValue }) {
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
        id: idEditValue
      }

      const response = await toast.promise(
        apiPEDEA.delete('/deleteFAQ', { data: payload }),
        {
          pending: 'Excluindo...',
          success: 'FAQ excluído com sucesso!',
          error:
            'Ocorreu um erro, infelizmente não foi possível excluir os dados.'
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      show={openModalDelete}
      onHide={closeModal}
      id="ContainerModalFAQDelete"
    >
      <Modal.Header closeButton>
        <Modal.Title className="titleModalFAQ">Excluir FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalFAQEdit">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">
            {' '}
            ⚠️ : A pergunta excluída não pode ser recuperada.
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

ModalFAQDelete.propTypes = {
  openModalDelete: PropTypes.bool.isRequired,
  setOpenModalDelete: PropTypes.func.isRequired,
  idEditValue: PropTypes.number.isRequired
}

export default ModalFAQDelete
