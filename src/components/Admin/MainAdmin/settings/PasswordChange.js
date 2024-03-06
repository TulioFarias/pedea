import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/Settings/passwordModal.scss'

function ModalChangePassword({ showPassword, setShowPassword }) {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleClose = () => setShowPassword(false)

  const handleSubmit = e => {
    e.preventDefault()
    handleClose()
  }

  return (
    <Modal show={showPassword} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mudar sua senha</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Senha antiga:</Form.Label>
            <Form.Control
              type="password"
              value={passwords.oldPassword}
              onChange={e => setPasswords(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>Nova senha:</Form.Label>
            <Form.Control
              type="password"
              value={passwords.newPassword}
              onChange={e => setPasswords(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>Confirme a nova senha:</Form.Label>
            <Form.Control
              type="password"
              value={passwords.confirmPassword}
              onChange={e => setPasswords(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
