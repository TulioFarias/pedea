import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import '../../../../sass/admin/settings.scss'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import api from '../../../../services/api'

function SettingsSystemAndUser() {
  const [user, setUser] = useState(null)
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.find(user => user.id === loggedInUserId)

        if (loggedInUser) {
          setUser(loggedInUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [loggedInUserId])

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

  return (
    <div className="ContainerSettingsAndUser container-fluid">
      {user && (
        <div>
          <Form className="containerUserSettings" onSubmit={handleSubmit}>
            <h3>Informações do Usuário</h3>
            <Form.Group className="containerUserSettings">
              <div className="user-imageSettings">
                <img alt="photo-user" src={user.url} />
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
                    value={user.name}
                    readOnly
                    className="valueInputCustom"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="inputsValuesUser">
                <Col sm="9">
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                    className="valueInputCustom"
                  />
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
              </Form.Group>
              <Button variant="primary" type="submit">
                Salvar Alterações
              </Button>
              <Button variant="danger">Sair</Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  )
}

export default SettingsSystemAndUser
