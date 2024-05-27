import PropTypes from 'prop-types'
import { React, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
function ChangeTableSideBar({ setShowSideBar, showSideBar }) {
  const handleClose = () => setShowSideBar(false)

  return (
    <>
      <div>
        <Offcanvas
          show={showSideBar}
          onHide={handleClose}
          placement="end"
          id="containerOffCanvasTable"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="titleSideBarChangeTable">
              Troca de tabela.
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

ChangeTableSideBar.propTypes = {
  setShowSideBar: PropTypes.func.isRequired,
  showSideBar: PropTypes.bool.isRequired
}

export default ChangeTableSideBar
