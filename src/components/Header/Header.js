import CameraAltIcon from '@mui/icons-material/CameraAlt'
import InfoIcon from '@mui/icons-material/Info'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import StraightenIcon from '@mui/icons-material/Straighten'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import React, { useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

import { vector } from '../../_config/layers/index'
import '../../sass/Header/ContainerButton.scss'
import PEDEA from '../../assets/img/pedea-logo.png'
import NavOptions from './NavHeaderToggle/NavHeader'

function HeaderActions() {
  const modalRef = useRef(null)
  const handlePrintAndDownload = () => {
    html2canvas(modalRef.current).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, 'screenshot.png')
      })
    })
  }
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

          <div className="d-flex align-items-center gap-3 custom-div">
            <button className="btn btn-outline-light btns-header">
              <InfoIcon className="btns-icon" />
            </button>
            <button
              className="btn btn-outline-light btns-header"
              onClick={handlePrintAndDownload}
            >
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
            <NavOptions />
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderActions
