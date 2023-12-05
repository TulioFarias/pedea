import CameraAltIcon from '@mui/icons-material/CameraAlt'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import StraightenIcon from '@mui/icons-material/Straighten'
import { Link } from '@mui/material'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useTranslation } from 'react-i18next'

import '../../sass/Header/ContainerButton.scss'
import PEDEA from '../../assets/img/pedea-logo.png'
import Login from '../Login'

function HeaderActions() {
  const { t } = useTranslation()
  return (
    <div>
      <Navbar
        expand={false}
        className="d-flex p-2 text-dark bg-opacity-50 custom-div-header"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={PEDEA} alt="Logo" className="img-fluid" />
          </Navbar.Brand>

          <Login />
          <div className="d-flex align-items-center gap-3 custom-div">
            <button className="btn btn-outline-light btns-header">
              <InfoIcon className="btns-icon" />
            </button>
            <button className="btn btn-outline-light btns-header">
              <CameraAltIcon className="btns-icon" />
            </button>
            <button className="btn btn-outline-light btns-header">
              <StraightenIcon className="btns-icon" />
            </button>
            <button className="btn btn-outline-light btns-header">
              <SquareFootIcon className="btns-icon" />
            </button>
          </div>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            placement="end"
            className=" my-navToogle-custom"
            backdrop={false}
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Title
              className="text-center"
              style={{ fontSize: '35px' }}
            >
              {t('Explorador de Dados')}
            </Offcanvas.Title>
            <Form className="d-flex mt-2 p-3">
              <Form.Control
                type="search"
                placeholder="Digite o nome da camada..."
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light">
                <SearchIcon />
              </Button>
            </Form>
            <Offcanvas.Body>
              <Offcanvas.Title style={{ fontSize: '30px' }}>
                {' '}
                {t('Categorias')}
              </Offcanvas.Title>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavDropdown title="Teste dados 1" href="#action1">
                  Dados 1
                </NavDropdown>
                <NavDropdown title="Teste dados 2" href="#action2">
                  Dados 2
                </NavDropdown>
                <NavDropdown title="Teste dados 3" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <hr />

              <div className="div-footer-toogler">
                <Button variant="outline-light">Baixar Dados</Button>
                <Link className="justify-content-end link-light">
                  Desativar camadas vísiveis
                </Link>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderActions
