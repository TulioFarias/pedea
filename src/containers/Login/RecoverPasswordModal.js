import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'

function RecoverPasswordModal({ show, setShow }) {
  const [email, setEmail] = useState('')
  const [recaptcha, setRecaptcha] = useState(null)

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // Aqui você pode fazer algo com o e-mail, como enviar para o servidor
    console.log('E-mail enviado:', email)
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar sua senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esqueceu sua senha?</p>
          <p>Etapa 1 de 3</p>
          <p>
            Verifique seu e-mail e, em seguida, enviaremos as instruções para
            criar uma nova senha:
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <ReCAPTCHA
              sitekey="6LezFHMpAAAAALIlQvnIfK6w0b__ZbmkJDiJ_f8I"
              onChange={value => setRecaptcha(value)}
            />
            <Button variant="primary" type="submit" disabled={!recaptcha}>
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

RecoverPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default RecoverPasswordModal
