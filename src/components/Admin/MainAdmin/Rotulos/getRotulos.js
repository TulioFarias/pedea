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
    key: ''
  })
  const [rotulosData, setRotulosData] = useState([])
  const schema = Yup.object().shape({
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
          key: data.key
        }),
        {
          pending: 'Buscando...',
          success: 'Dados encontrados.',
          error:
            'Não foi possível encontrar os dados. Verifique e tente novamente.'
        }
      )

      if (response.data.result) {
        setRotulosData([response.data.result])
      } else {
        toast.error(
          'Dados não encontrados... Verificar a chave e tentar novamente.'
        )
      }
    } catch (error) {
      return console.log(error)
    }
  }

  return (
    <>
      <div className="containerResultofRotulos">
        <p>Digite a chave do rótulo:</p>
        <Form className="ResultRotulos" onSubmit={handleSubmit(onSubmit)}>
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
