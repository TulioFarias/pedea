import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import '../../../../sass/admin/Settings/settings.scss'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
  Container
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

import api from '../../../../services/api'

function SettingsSystemAndUser() {
  const [user, setUser] = useState([])
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  console.log(user)

  console.log(user)
  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.filter(user => user.id === loggedInUserId)
        console.log(loggedInUser)

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
      {user &&
        user.map(value => (
          <div key={value.id}>
            <Container fluid>
              <div className="containerUserSettings">
                <h3>Informações do Usuário</h3>
                <div className="user-imageSettings">
                  <img alt="photo-user" src={value.url} />
                </div>

                <div className="containerFileImg">
                  <button className="file-btn">
                    <CloudUploadRoundedIcon />
                  </button>
                </div>

                <Row className="inputsValuesUser">
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      name="name"
                      value={value.name}
                      readOnly
                      className="valueInputCustom"
                    />
                  </Col>
                </Row>
                <Row className="inputsValuesUser">
                  <Col sm="9">
                    <Form.Control
                      type="email"
                      name="email"
                      value={value.email}
                      readOnly
                      className="valueInputCustom"
                    />
                  </Col>
                </Row>
                <Row className="inputsValuesUser">
                  <Col sm="9">
                    <InputGroup>
                      <FormControl
                        type="password"
                        name="password"
                        className="valueInputCustom"
                        value={'XXXXXXXXXXX'}
                      />
                      <Button variant="secondary">
                        <EditRoundedIcon />
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        ))}
    </div>
  )
}

export default SettingsSystemAndUser
