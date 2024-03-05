import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
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
      <Container fluid className="containerWrapperOptions"></Container>
    </>
  )
}

export default Geoserver
