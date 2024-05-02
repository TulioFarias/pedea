import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'
import ContainerGetInfoRotulos from './getRotulos'

function RotulosSystem() {
  const [valueLanguage, setValueLanguage] = useState({
    id: '',
    key: '',
    pt_br: '',
    en: '',
    es: ''
  })

  const [rotulosData, setRotulosData] = useState([])

  const schema = Yup.object().shape({
    id: Yup.string().required('O ID é obrigatório.'),
    key: Yup.string().required('A chave é obrigatória'),
    pt_br: Yup.string().required('Esse campo é obrigatório.'),
    en: Yup.string().required('Esse campo é obrigatório.'),
    es: Yup.string().required('Esse campo é obrigatório.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleChange = event => {
    const { name, value } = event.target
    setValueLanguage(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = async (data, event) => {
    try {
      const response = await toast.promise(
        api.post('/rotulos', {
          id: data.id,
          key: data.key,
          pt_br: data.pt_br,
          en: data.en,
          es: data.es
        }),
        {
          pending: 'Cadastrando...',
          success: 'Enviado com sucesso',
          error: 'Não foi possível realizar o cadastro.'
        }
      )

      event.preventDefault()
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <Container fluid className="containerWrapperOptions">
      <div className="ContainerAllRotulosOptions">
        <div className="ContainerAddInfoRotulos">
          <Form className="containerInfos" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label className="LabelRotulos">ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o ID"
                onChange={handleChange}
                {...register('id')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.id?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="LabelRotulos">Chave:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a chave"
                onChange={handleChange}
                {...register('key')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulos">Português:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={handleChange}
                {...register('pt_br')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.pt_br?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulos">Inglês:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={handleChange}
                {...register('en')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.en?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulos">Espanhol:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={handleChange}
                {...register('es')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.es?.message}</p>
            </Form.Group>

            <Button variant="secondary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        <ContainerGetInfoRotulos />
      </div>
    </Container>
  )
}

export default RotulosSystem
