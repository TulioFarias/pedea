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

import userIcon from '../../../../assets/icons/icon-user.png'
import api from '../../../../services/api'
import ModalChangePassword from './modalSettings/PasswordChange'
import ModalChangePhotoUser from './modalSettings/PhotoUserChange'

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

  const formatarDataLegivel = dataString => {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]

    const data = new Date(dataString)
    const dia = data.getDate()
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()

    return `${dia} de ${mes} de ${ano}`
  }

  return (
    <Container fluid className="ContainerSettingsAndUser ">
      {user &&
        user.map(value => (
          <div key={value.id}>
            <Container fluid>
              <div className="containerUserSettings">
                <h3 className="titleUserSettings">Informações cadastrais:</h3>
                <Row className='RowContainerFileAndNameUser'>
                  <Col sm={3}>
                    <div className="user-imageSettings">
                      <img
                        alt="photo-user"
                        src={value.path ? value.url : userIcon}
                      />
                    </div>
                  </Col>
                  <Col sm={9}>
                    <div className="containerFileImg">
                      <button className="file-btn" onClick={handleShowPhoto}>
                        <CloudUploadRoundedIcon />
                      </button>
                    </div>
                  
                  </Col>
                </Row>

                <Row className="inputsValuesUser">
                <Col sm="9">
                <Form.Label className="customLabelUser">Nome:</Form.Label>
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
                    <Form.Label className="customLabelUser">Email:</Form.Label>
                    <Form.Control
                      type="text"
                      name="role"
                      value={value.email}
                      readOnly
                      className="valueInputCustom"
                    />
                  </Col>
                </Row>

              
                <Row className="inputsValuesUser">
                  <Col sm="9">
                    <Form.Label className="customLabelUser">
                      Criado em:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="create"
                      value={formatarDataLegivel(value.createdAt)}
                      readOnly
                      className="valueInputCustom"
                    />
                  </Col>
                </Row>
                <Row className="inputsValuesUser">
                  <Col sm="9">
                    <Form.Label className="customLabelUser">
                      Trocar sua senha?
                    </Form.Label>
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
    </Container>
  )
}

export default SettingsSystemAndUser
