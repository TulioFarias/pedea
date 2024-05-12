import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'
import ContainerGetInfoRotulos from './getRotulos'
import ContainerInfoRotulos from './TableInfoRotulos'

function RotulosSystem() {
  const [valueLanguage, setValueLanguage] = useState({
    key: '',
    pt_br: '',
    en: '',
    es: ''
  })

  const [rotulosData, setRotulosData] = useState([])
  const [tableUpdated, setTableUpdated] = useState(false)

  console.log(tableUpdated)

  const handleTableUpdate = () => {
    setTableUpdated(true)
  }

  const schema = Yup.object().shape({
    key: Yup.string().required('A chave é obrigatória'),
    pt_br: Yup.string().required('Esse campo é obrigatório.'),
    en: Yup.string().required('Esse campo é obrigatório.'),
    es: Yup.string().required('Esse campo é obrigatório.')
  })

  const {
    register,
    handleSubmit,
    reset,
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

      reset()
      handleTableUpdate()
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
                placeholder="Digite valor em português"
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
                placeholder="Digite valor em inglês"
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
                placeholder="Digite valor em espanhol"
                onChange={handleChange}
                {...register('es')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.es?.message}</p>
            </Form.Group>

            <Button
              variant="secondary"
              type="submit"
              className="btnSubmitAddRotulos"
            >
              Enviar
            </Button>
          </Form>

          <ContainerInfoRotulos
            tableUpdated={tableUpdated}
            handleTableUpdate={handleTableUpdate}
          />
        </div>

        <ContainerGetInfoRotulos />
      </div>
    </Container>
  )
}

export default RotulosSystem
