import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import '../../../../sass/admin/settings.scss'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

function SettingsSystemAndUser() {
  const [userFile, setUserFile] = useState([])

  useEffect(() => {
    async function loadfileUsers() {
      try {
        const { data } = await api.get('/admin')
        setUserFile(data)
      } catch (error) {
        console.error('Error fetching user files:', error)
      }
    }

    loadfileUsers()
  }, [])

  console.log(userFile)

  const schema = Yup.object().shape({
    file: Yup.mixed().required('Por favor, carregue um arquivo')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data, userId) => {
    try {
      const response = await toast.promise(
        api.put(`/admin/update-user/${userId}`, {
          email: data.email
        }),
        {
          pending: 'Verificando os dados...',
          success: 'Imagem atualizada com sucesso.',
          error: 'Ops! Aconteceu algum erro, tente novamente!'
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="ContainerSettingsAndUser container-fluid">
      {userFile.map(value => (
        <Form
          key={value.id}
          className="containerUserSettings"
          onSubmit={e => handleSubmit(data => onSubmit(data, value.id))(e)}
        >
          <h3>Informações do Usuário</h3>
          <Form.Group className="containerUserSettings">
            <div className="user-imageSettings">
              <img src={value.url} alt="photo-user" />
            </div>

            <div className="containerFileImg">
              <label htmlFor="fileInput" className="file-label">
                <CloudUploadRoundedIcon />
              </label>
              <input
                type="file"
                className="fileImageInput"
                accept="image/png, image/jpeg"
                {...register('file')}
              />
            </div>

            <Form.Group as={Row} className="inputsValuesUser">
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="name"
                  value={value.name}
                  readOnly
                  className="valueInputCustom"
                />
              </Col>
              <Col sm="1">
                <Button variant="secondary">
                  <EditRoundedIcon />
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="inputsValuesUser">
              <Col sm="9">
                <Form.Control
                  type="email"
                  name="email"
                  value={value.email}
                  readOnly
                  className="valueInputCustom"
                />
              </Col>
              <Col sm="1">
                <Button variant="secondary">
                  <EditRoundedIcon />
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="inputsValuesUser">
              <Col sm="9">
                <Form.Control
                  type="password"
                  name="password"
                  className="valueInputCustom"
                  value={'XXXXXXXXXXX'}
                />
              </Col>
              <Col sm="1">
                <Button variant="secondary">
                  <EditRoundedIcon />
                </Button>
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar Alterações
            </Button>
            <Button variant="danger">Sair</Button>
          </Form.Group>
        </Form>
      ))}
    </div>
  )
}

export default SettingsSystemAndUser
