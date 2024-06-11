import React from 'react'
import '../../../../sass/admin/FAQ/addfaq.scss'
import { Form, InputGroup, Container, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import apiPEDEA from '../../../../services/api'

function AddInfoFAQ() {
  const schema = Yup.object().shape({
    question: Yup.string().required('A pergunta é obrigatória'),
    answer: Yup.string().required('A resposta é obrigatória')
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    console.log(data)
    try {
      await toast.promise(
        apiPEDEA.post('/addFAQ', {
          question: data.question,
          answer: data.answer
        }),
        {
          pending: 'Adicionando FAQ...',
          success: 'FAQ adicionada com sucesso!',
          error: 'Erro ao adicionar FAQ.'
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container className="containerWrapperAddInfoFAQ">
      <Form className="FormsContainerAddFAQ" onSubmit={handleSubmit(onSubmit)}>
        <div className="containerInputsFAQ">
          <p>
            Para adicionar uma nova pergunta e uma nova resposta na página de
            FAQ PEDEA, preencha os campos abaixo:
          </p>
          <label className="labelsInputsFAQ">Adicione uma pergunta:</label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Digite a pergunta..."
              {...register('question')}
              className="AddinputFAQ"
            />
          </InputGroup>
          <p className="txtErrorPassword">{errors.question?.message}</p>
        </div>
        <div className="containerInputsFAQ">
          <label className="labelsInputsFAQ">Adicione uma resposta:</label>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Digite a resposta..."
              {...register('answer')}
              className="AddinputFAQ"
            />
          </Form.Group>
          <p className="txtErrorPassword">{errors.answer?.message}</p>
        </div>
        <Button type="submit" variant="secondary-outline">
          Criar nova FAQ
        </Button>
      </Form>
    </Container>
  )
}

export default AddInfoFAQ
