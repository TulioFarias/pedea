import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'
import ContainerGetInfoRotulos from './getRotulos'
import IfKeyExist from './modalsRotulos/modalKeyExist'
import ImportFileRotulos from './registerFileRotulos'
import ContainerInfoRotulos from './TableInfoRotulos'

function CreateRotulosSystem() {
  const [valueLanguage, setValueLanguage] = useState({
    key: '',
    pt_br: '',
    en: '',
    es: ''
  })
  const [dataInfoKey, setDataInfoKey] = useState([])
  const [tableUpdated, setTableUpdated] = useState(false)
  const [showModalIfKey, setShowModalIfKey] = useState(false)
  const [editItemId, setEditItemId] = useState(null)

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

  const showModalToUpdate = () => {
    setShowModalIfKey(true)
  }

  const onSubmit = async (data, event) => {
    try {
      const foundItem = dataInfoKey.find(item => item.key === data.key)

      if (!foundItem) {
        const response = await api.post('/rotulos', {
          key: data.key,
          pt_br: data.pt_br,
          en: data.en,
          es: data.es
        })

        toast.success('Cadastrado com sucesso.')
      } else {
        toast.error('Chave já cadastrada.')
        showModalToUpdate()
      }

      reset()
      handleTableUpdate()
      event.preventDefault()
    } catch (error) {
      return console.log(error)
    }
  }

  console.log(editItemId)

  return (
    <Container fluid className="containerWrapperOptions">
      <div className="ContainerAllRotulosOptions">
        <div className="ContainerAddInfoRotulos">
          <Form className="containerInfos" onSubmit={handleSubmit(onSubmit)}>
            <div className="titleRegisterRotulo">
              <p>Preencha os campos abaixo para cadastrar um rótulo:</p>
            </div>

            <div className="containersLabelsFormRegisterRotulos">
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
                Cadastrar
              </Button>
            </div>
          </Form>

          <IfKeyExist
            showModalIfKey={showModalIfKey}
            setShowModalIfKey={setShowModalIfKey}
            handleTableUpdate={handleTableUpdate}
            setEditItemId={setEditItemId}
          />

          <div className="ContainersRegisterFileRotulos">
            <ImportFileRotulos />
          </div>

          <div className="ContainerGetWithKeyRotulos">
            <ContainerGetInfoRotulos />
          </div>
        </div>

        <ContainerInfoRotulos
          setDataInfoKey={setDataInfoKey}
          tableUpdated={tableUpdated}
          handleTableUpdate={handleTableUpdate}
          setEditItemId={setEditItemId}
          editItemId={editItemId}
        />
      </div>
    </Container>
  )
}

export default CreateRotulosSystem
