import CameraAltIcon from '@mui/icons-material/CameraAlt'
import InfoIcon from '@mui/icons-material/Info'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import StraightenIcon from '@mui/icons-material/Straighten'
import React from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import '../../sass/Header/ContainerButton.scss'
import PEDEA from '../../assets/img/pedea-logo.png'
import NavOptions from './NavHeaderToggle/NavHeader'

function HeaderActions() {
  return (
    <div>
      <Navbar expand={false} className="custom-div-header" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={PEDEA} alt="Logo" className="img-fluid" />
          </Navbar.Brand>

          <div className="ContainerBtnsHeader">
            <button className="HeaderBtbs">
              <InfoIcon />
            </button>
            <button className="HeaderBtbs">
              <CameraAltIcon />
            </button>
            <button className="HeaderBtbs">
              <StraightenIcon />
            </button>
            <button className="HeaderBtbs">
              <SquareFootIcon />
            </button>
          </div>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            placement="end"
            className=" my-navToogle-custom"
            backdrop={false}
          >
            <NavOptions />
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderActions
