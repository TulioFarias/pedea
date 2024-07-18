import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import '../../../../../sass/admin/Rotulos/rotulos.scss'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Tooltip } from '@mui/material'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'

import apiPEDEA from '../../../../../services/api'
import ContainerInfoRotulos from '../changeTableView/TableInfoRotulos'
import ContainerGetInfoRotulos from '../findRotulosAndFiles/getRotulos'
import IfKeyExist from '../modalsRotulos/modalKeyExist'

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
    setTableUpdated(prev => !prev)
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
    console.log(data)

    try {
      const foundItem = await dataInfoKey.find(item => item.key === data.key)
      console.log(foundItem)

      if (!foundItem) {
        const APIResponse = await apiPEDEA.post('/rotulos', {
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
      console.log(error)
    }
  }

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/getAllRotulos')
        setDataInfoKey(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  const infoUserTutorial = {
    createRotuos: {
      key: 'Para criar uma chave para um rótulo com nome à sua escolha, é necessário definir os valores em três idiomas: português, inglês e espanhol. ',
      pt: 'Escreva um valor para esse campo em português.',
      en: 'Escreva um valor para esse campo em inglês.',
      es: 'Escreva um valor para esse campo em espanhol'
    }
  }

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
                <Form.Label className="LabelRotulos">
                  Chave:
                  <Tooltip
                    title={infoUserTutorial.createRotuos.key}
                    className="customToltip"
                    placement="right"
                  >
                    <InfoRoundedIcon />
                  </Tooltip>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a chave"
                  onChange={handleChange}
                  {...register('key')}
                  className="InputRotulos"
                  isInvalid={errors.key}
                />
                <p className="txtErrorPassword">{errors.key?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                  Português:
                  <Tooltip
                    title={infoUserTutorial.createRotuos.pt}
                    className="customToltip"
                    placement="right"
                  >
                    <InfoRoundedIcon />
                  </Tooltip>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite valor em português"
                  onChange={handleChange}
                  {...register('pt_br')}
                  className="InputRotulos"
                  isInvalid={errors.pt_br}
                />
                <p className="txtErrorPassword">{errors.pt_br?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                  Inglês:
                  <Tooltip
                    title={infoUserTutorial.createRotuos.en}
                    className="customToltip"
                    placement="right"
                  >
                    <InfoRoundedIcon />
                  </Tooltip>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite valor em inglês"
                  onChange={handleChange}
                  {...register('en')}
                  className="InputRotulos"
                  isInvalid={errors.en}
                />
                <p className="txtErrorPassword">{errors.en?.message}</p>
              </Form.Group>

              <Form.Group>
                <Form.Label className="LabelRotulos">
                  Espanhol:
                  <Tooltip
                    title={infoUserTutorial.createRotuos.es}
                    className="customToltip"
                    placement="right"
                  >
                    <InfoRoundedIcon />
                  </Tooltip>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite valor em espanhol"
                  onChange={handleChange}
                  {...register('es')}
                  className="InputRotulos"
                  isInvalid={errors.es}
                />
                <p className="txtErrorPassword">{errors.es?.message}</p>
              </Form.Group>

              <Button
                variant="secondary"
                className="btnSubmitAddRotulos"
                type="submit"
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

          <div className="ContainerGetWithKeyRotulos">
            <ContainerGetInfoRotulos />
          </div>
        </div>

        <ContainerInfoRotulos
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
