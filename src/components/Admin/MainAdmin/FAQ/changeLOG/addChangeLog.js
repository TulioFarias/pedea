import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import apiPEDEA from '../../../../../services/api'
function AddInfoChangeLog() {
  const schema = Yup.object().shape({
    version: Yup.number('Insira o número da versão').required(
      'A numeração da versão é obrigatória.'
    ),
    message: Yup.string().required('A mensagem é obrigatória.')
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
              <label className="labelChangeLog">Versão de atualização:</label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Digite o número da versão de atualização"
                  {...register('version')}
                  className="inputChangeLog"
                  isInvalid={errors.version}
                />
              </InputGroup>
              <p className="errorTxtChangeLog">{errors.version?.message}</p>
            </Form.Group>

            <Form.Group className="containerInputsChangeLog">
              <label className="labelChangeLog">Mensagem de atualização:</label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escreva a mensagem de atualização"
                {...register('message')}
                className="inputChangeLog"
                isInvalid={errors.message}
              />
              <p className="errorTxtChangeLog">{errors.message?.message}</p>
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
