import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

function ContainerGetInfoRotulos() {
  const [findDataRotulos, setfindDataRotulos] = useState({
    id: '',
    key: ''
  })
  const [rotulosData, setRotulosData] = useState([])
  const schema = Yup.object().shape({
    id: Yup.string().required('O ID é obrigatório.'),
    key: Yup.string().required('A chave é obrigatória')
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
    setfindDataRotulos(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const onSubmit = async data => {
    try {
      const response = await toast.promise(
        api.post('/getRotulos', {
          id: data.id,
          key: data.key
        }),
        {
          pending: 'Buscando...',
          success: 'Dados encontrados.',
          error:
            'Não foi possível encontrar os dados. Verifique e tente novamente.'
        }
      )
    } catch (error) {
      return console.log(error)
    }
  }

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getRotulos')

        const filteredData = data.filter(item => {
          return (
            item.id === findDataRotulos.id && item.key === findDataRotulos.key
          )
        })

        setRotulosData(filteredData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [rotulosData])

  return (
    <>
      <div className="containerResultofRotulos">
        <Form className="ResultRotulos" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label className="LabelRotulos">ID:</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              {...register('id')}
              className="InputRotulos"
              onChange={handleChange}
            />
            <p className="txtErrorPassword">{errors.id?.message}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label className="LabelRotulos">Chave:</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              className="InputRotulos"
              {...register('key')}
              onChange={handleChange}
            />
            <p className="txtErrorPassword">{errors.key?.message}</p>
          </Form.Group>

          <Button variant="secondary" type="submit">
            Enviar
          </Button>

          <div className="ContainerValuesDataRotulos">
            {rotulosData &&
              rotulosData.map(value => (
                <div key={value.id}>
                  <p>Aqui está os valores encontrados:</p>

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
    </>
  )
}

export default ContainerGetInfoRotulos
