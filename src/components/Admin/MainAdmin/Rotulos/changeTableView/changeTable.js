import PropTypes from 'prop-types'
import { React } from 'react'
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
              Mudar de tabela.
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="buttonContainer">
              <div className="buttonWrapper">
                <button className="buttonClass" onClick={() => {}}>
                  Tabela de rótulos
                </button>
              </div>
              <div className="buttonWrapper">
                <button className="buttonClass" onClick={() => {}}>
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
  showSideBar: PropTypes.bool.isRequired
}

export default ChangeTableSideBar
