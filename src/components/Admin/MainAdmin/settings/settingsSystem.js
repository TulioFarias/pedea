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
import ModalChangePassword from './PasswordChange'
import ModalChangePhotoUser from './PhotoUserChange'

function SettingsSystemAndUser() {
  const [showModalPhoto, setShowModalPhoto] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState([])
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const { id: loggedInUserId } = userData

  const handleShowPhoto = () => setShowModalPhoto(true)
  const handleShowPassword = () => setShowPassword(true)
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
                  <button className="file-btn" onClick={handleShowPhoto}>
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
                      <Button variant="secondary" onClick={handleShowPassword}>
                        <EditRoundedIcon />
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Container>
            <ModalChangePhotoUser
              showModalPhoto={showModalPhoto}
              setShowModalPhoto={setShowModalPhoto}
            />
            <ModalChangePassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        ))}
    </div>
  )
}

export default SettingsSystemAndUser