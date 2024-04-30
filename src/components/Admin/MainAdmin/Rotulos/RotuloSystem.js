import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

import { Label } from '@mui/icons-material'
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
    PTBR: Yup.string().required('Esse campo é obrigatório.'),
    EN: Yup.string().required('Esse campo é obrigatório.'),
    ES: Yup.string().required('Esse campo é obrigatório.')
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

  const onSubmit = async data => {
    console.log(data)
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
    } catch (error) {
      return console.log(error)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/rotulos')

        setRotulosData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [])

  console.log(rotulosData)

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
                {...register('PTBR')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.PTBR?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulos">Inglês:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={handleChange}
                {...register('EN')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.EN?.message}</p>
            </Form.Group>

            <Form.Group>
              <Form.Label className="LabelRotulos">Espanhol:</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={handleChange}
                {...register('ES')}
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.ES?.message}</p>
            </Form.Group>

            <Button variant="secondary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>

        <div className="containerResultofRotulos">
          <Form className="ResultRotulos">
            <Form.Group>
              <Form.Label className="LabelRotulos">ID:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o ID"
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.id?.message}</p>
            </Form.Group>
            <Form.Group>
              <Form.Label className="LabelRotulos">Chave:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a chave"
                className="InputRotulos"
              />
              <p className="txtErrorPassword">{errors.key?.message}</p>
            </Form.Group>

            <Button variant="secondary">Enviar</Button>

            <div className="ContainerValuesDataRotulos">
              {rotulosData &&
                rotulosData.map(value => (
                  <div key={value.id}>
                    <div className="containerValues">
                      <label>ID:</label>
                      <p> {value.id}</p>
                    </div>

                    <div className="containerValues">
                      <label>Chave:</label>
                      <p>{value.key}</p>
                    </div>

                    <div className="containerValues">
                      <label>Português:</label>
                      <p>{value.pt_br}</p>
                    </div>

                    <div className="containerValues">
                      <label>Inglês:</label>
                      <p>{value.en}</p>
                    </div>

                    <div className="containerValues">
                      <label>Espanhol:</label>
                      <p>{value.es}</p>
                    </div>
                  </div>
                ))}
            </div>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default RotulosSystem
