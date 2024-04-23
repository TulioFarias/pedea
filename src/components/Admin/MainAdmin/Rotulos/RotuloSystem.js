import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'
function RotulosSystem() {
  const [valueLanguage, setValueLanguage] = useState({
    key: '',
    language: '',
    result: ''
  })

  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    language: Yup.string().required('Selecione um idioma.')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const handleChange = event => {
    const { value } = event.target
    setValueLanguage(prevState => ({
      ...prevState,
      key: value
    }))
  }

  const handleSelectChange = event => {
    const { value } = event.target
    setValueLanguage(prevState => ({
      ...prevState,
      language: value
    }))
  }

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.post('/language', {
          key: data.key,
          language: data.language
        }),

        {
          pending: 'Atualizando...',
          success: 'Enviado com sucesso',
          error: 'Chave não encontrada...'
        }
      )

      setValueLanguage(prevState => ({
        ...prevState,
        result: response.data.value
      }))
    } catch (error) {
      return error
    }
  }

  console.log(valueLanguage)

  return (
    <>
      <Container fluid className="containerWrapperOptions">
        <Form className="containerInfos" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Key:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a chave"
              onChange={handleChange}
              {...register('key')}
            />
            <p className="txtErrorPassword">{errors.key?.message}</p>
          </Form.Group>

          <Form.Group>
            <Form.Label>Selecione Idioma:</Form.Label>
            <Form.Control
              as="select"
              onChange={handleSelectChange}
              {...register('language')}
            >
              <option value="">Selecione...</option>
              <option value="ptBR">Português</option>
              <option value="es">Espanhol</option>
              <option value="en">Inglês</option>
            </Form.Control>
            <p className="txtErrorPassword">{errors.language?.message}</p>
          </Form.Group>

          <Button variant="primary" type="submit">
            Enviar
          </Button>

          <Form.Group>
            <Form.Label>Resultado:</Form.Label>
            <Form.Control type="text" value={valueLanguage.result} />
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}

export default RotulosSystem
