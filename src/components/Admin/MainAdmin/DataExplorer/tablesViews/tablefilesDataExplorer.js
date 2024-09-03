import PropTypes from 'prop-types'
import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import '../../../../../sass/admin/DataExplorer/changetable.scss'



function ChangeTable({ setShowSideBar, showSideBar, setSelectedTable }) {
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
              
                <button
                  className="buttonClass"
                  onClick={() => handleSelectTable('TableRotulos')}
                >
                  Tabela do explorador de dados
                </button>
                <button
                  className="buttonClass"
                  onClick={() => handleSelectTable('FilesRotulos')}
                >
                  Tabela de arquivos .csv cadastrados
                </button>

                <button
                  className="buttonClass"
                  onClick={() => handleSelectTable('FilesEdit')}
                >
                  Tabela de arquivos .csv edição
                </button>
              
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  )
}

ChangeTable.propTypes = {
  setShowSideBar: PropTypes.func.isRequired,
  showSideBar: PropTypes.bool.isRequired,
  setSelectedTable: PropTypes.func.isRequired
}

export default ChangeTable
