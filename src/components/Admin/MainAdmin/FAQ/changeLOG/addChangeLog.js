import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'

function AddInfoChangeLog() {
  const [numberFloat, setNumberFloat] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateChangeLog = event => {
    event.preventDefault()
    console.log('Number Float:', numberFloat)
    console.log('Message:', message)
    // Aqui você pode adicionar a lógica para criar o changelog
  }

  return (
    <>
      <div>
        <div className="containerAddChangeLog">
          <p>
            Para adicionar um novo registro de atualização, preencha os campos
            abaixo:
          </p>
          <Form onSubmit={handleCreateChangeLog}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="numberFloat">
                Versão de atualização:
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  id="numberFloat"
                  placeholder="Digite o número da versão de atualização"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">
                Mensagem de atualização:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Escreva a mensagem de atualização"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Change Log
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddInfoChangeLog
