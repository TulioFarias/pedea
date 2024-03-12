import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import '../../../../sass/admin/Settings/passwordModal.scss'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'
function ModalChangePassword({ showPassword, setShowPassword }) {
  const [error, setError] = useState(null)
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData
  const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Senha antiga é obrigatória'),
    newPassword: Yup.string().required('Nova senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'As senhas não coincidem')
      .required('Confirmação de senha é obrigatória')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    setShowPassword(false)
    setError(null)
  }

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.put(`/admin/update-user/${loggedInUserId}`, {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        }),
        {
          pending: 'Atualizando senha...',
          success: 'Senha atualizada com sucesso.',
          error: 'Ocorreu algum erro ao atualizar a senha.'
        }
      )

      console.log('Resposta:', response)
      handleClose()
    } catch (error) {
      return error
    }
  }

  return (
    <Modal
      show={showPassword}
      onHide={handleClose}
      id="ContainerModalPasswordChange"
    >
      <Modal.Header closeButton>
        <Modal.Title className="titleModalPassword">
          Mudar sua senha
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bodyModalPasswordChange">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="txt">
            Preencha todos os campos abaixo para requisitar uma nova senha:
          </p>

          <div className="containerInputsPasswordChange">
            <Form.Group controlId="formOldPassword">
              <Form.Label className="labelInputPassword">
                Senha antiga:
              </Form.Label>
              <Form.Control type="password" {...register('oldPassword')} />
              <p className="txtErrorPassword">{errors.newPassword?.message}</p>
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label className="labelInputPassword">
                Nova senha:
              </Form.Label>
              <Form.Control type="password" {...register('newPassword')} />
              <p className="txtErrorPassword">{errors.newPassword?.message}</p>
            </Form.Group>
            <Form.Group controlId="formConfirmNewPassword">
              <Form.Label className="labelInputPassword">
                Confirme a nova senha:
              </Form.Label>
              <Form.Control type="password" {...register('confirmPassword')} />
              <p className="txtErrorPassword">{errors.newPassword?.message}</p>
            </Form.Group>
          </div>

          <Button
            variant="secondary"
            type="submit"
            className="btn-sendPassword"
          >
            Enviar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

ModalChangePassword.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired
}

export default ModalChangePassword
