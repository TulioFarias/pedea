import CameraAltIcon from '@mui/icons-material/CameraAlt'
import InfoIcon from '@mui/icons-material/Info'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import StraightenIcon from '@mui/icons-material/Straighten'
import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'

import PEDEA from '../../assets/pedea-logo.png'
import NavHeader from './GovHeader'

import '../../sass/Header.scss/ContainerButton.scss'

function Header() {
  return (
    <div>
      <NavHeader />
      <Navbar
        expand={false}
        className="d-flex p-2 text-dark bg-opacity-50 custom-div-header"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={PEDEA} alt="Logo" className="img-fluid" />
          </Navbar.Brand>
          <div className="d-flex align-items-center gap-3 custom-div">
            <button className="btn btn-outline-light">
              <InfoIcon />
            </button>
            <button className="btn btn-outline-light">
              <CameraAltIcon />
            </button>
            <button className="btn btn-outline-light">
              <StraightenIcon />
            </button>
            <button className="btn btn-outline-light">
              <SquareFootIcon />
            </button>
          </div>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            placement="end"
            className="bg-light"
          >
            <Offcanvas.Header closeButton />
            <Offcanvas.Title className="text-center">
              Explorador de Dados
            </Offcanvas.Title>
            <Form className="d-flex mt-2 p-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
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
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
