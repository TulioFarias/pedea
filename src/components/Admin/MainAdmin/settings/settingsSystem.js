import EditRoundedIcon from '@mui/icons-material/EditRounded'
import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import '../../../../sass/admin/settings.scss'
import { useSelector } from 'react-redux'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
function SettingsSystemAndUser() {
  const userReducer = useSelector(state => state.userReducer)

  console.log(userReducer)

  const [fileName, setfileName] = useState(null)

  return (
    <>
      <div className="ContainerSettingsAndUser container-fluid">
        <Form className="containerUserSettings">
          <h3>Informações do Usuário</h3>
          <Form.Group as={Row} controlId="formUserImage" className="teste">
            <Col sm="10" className="user-imageSettings">
              <img src="" alt="Foto do Usuário" />
            </Col>
            <div className="containerFileImg">
              <label htmlFor="fileInput" className="file-label">
                <CloudUploadRoundedIcon />
              </label>
              <input
                type="file"
                className="fileImageInput"
                accept="image/png, image/jpeg"
                onChange={value => setfileName(value.target.files[0]?.name)}
              />
            </div>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formUserName"
            className="inputsValuesUser"
          >
            <Col sm="9">
              <Form.Control type="text" name="name" readOnly />
            </Col>
            <Col sm="1">
              <Button variant="secondary">
                <EditRoundedIcon />
              </Button>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formUserEmail"
            className="inputsValuesUser"
          >
            <Col sm="9">
              <Form.Control type="email" name="email" readOnly />
            </Col>
            <Col sm="1">
              <Button variant="secondary">
                <EditRoundedIcon />
              </Button>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId="formUserPassword"
            className="inputsValuesUser"
          >
            <Col sm="9">
              <Form.Control type="password" name="password" />
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
        </Form>

        {/* Opções do Sistema */}
        <div className="containerSystemSettings">
          <h3>Opções do Sistema</h3>
          <p>Adicionar posteriormente opções para o sistema</p>
        </div>
      </div>
    </>
  )
}

export default SettingsSystemAndUser
