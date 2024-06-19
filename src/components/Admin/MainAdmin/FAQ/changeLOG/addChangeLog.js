import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import apiPEDEA from '../../../../../services/api'
function AddInfoChangeLog() {
  const schema = Yup.object().shape({
    version: Yup.number().required('A numeração da versão é obrigatória.'),
    answer: Yup.string().required('A mensagem é obrigatória.')
  })
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)
    try {
      await toast.promise(
        apiPEDEA.post('/addInfoEvolution', {
          version: data.version,
          message: data.message
        }),
        {
          pending: 'Adicionando novo registro...',
          success: 'Registro de atualização criado com sucesso!',
          error: 'Erro ao adicionar novo registro.'
        }
      )

      reset()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div>
        <div className="containerAddChangeLog">
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="containerFormChangeLog"
          >
            <p>
              Para adicionar um novo registro de atualização, preencha os campos
              abaixo:
            </p>
            <Form.Group className="containerInputsChangeLog">
              <Form.Label>Versão de atualização:</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  placeholder="Digite o número da versão de atualização"
                  {...register('version')}
                  className="inputChangeLog"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="containerInputsChangeLog">
              <Form.Label className="labelChangeLog">
                Mensagem de atualização:
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Escreva a mensagem de atualização"
                {...register('message')}
                className="inputChangeLog"
              />
            </Form.Group>

            <Button className="BtnChangeLogSubmit" type="submit">
              Registrar nova atualização
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddInfoChangeLog
