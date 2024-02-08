import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../../sass/admin/geoserver.scss'

function Geoserver() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Dados do formulário enviados:', formData)
  }
  return (
    <>
      <div className="containerAll">
        <div className="containerGeoserver">
          <h2>Sistema Geoserver</h2>
          <div className="containerInfo">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNome" className="customContainerForm">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="customContainerForm">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formSenha" className="customContainerForm">
                <Form.Label>Senha:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="buttonSubmit">
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Geoserver
