import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
function ChangeTableSideBar({ setShowSideBar, showSideBar, setSelectedTable }) {
  const handleClose = () => setShowSideBar(false)

  const handleSelectTable = table => {
    setSelectedTable(table)
    handleClose()
  }

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
              Mudar de tabela.
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="buttonContainer">
              <div className="buttonChangeMapWrapper">
                <button
                  className="buttonClass"
                  onClick={() => handleSelectTable('TableRotulos')}
                >
                  Tabela de rótulos
                </button>
                <button
                  className="buttonClass"
                  onClick={() => handleSelectTable('FilesRotulos')}
                >
                  Tabela de arquivos cadastrados
                </button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

ChangeTableSideBar.propTypes = {
  setShowSideBar: PropTypes.func.isRequired,
  showSideBar: PropTypes.bool.isRequired,
  setSelectedTable: PropTypes.func.isRequired
}

export default ChangeTableSideBar
