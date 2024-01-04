import PropTypes from 'prop-types'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import '../../../sass/btns-Left/helpModal.scss'

import logoIMG from '../../../assets/img/logoCientistaChefe.png'

const ModalHelp = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" id="containerModalHelp">
        <Modal.Header>
          <Modal.Title>
            <img src={logoIMG} alt="Header Image" className="img-fluid" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A plataforma <strong>PEDEA</strong> é um ambiente virtual para
            visualizar os dados espaciais organizados pelos órgãos ambientais e
            de fiscalização do Estado do Ceará.
          </p>
          <p>
            A <strong>PEDEA</strong> é composta por três módulos:
            <ol>
              <br />
              <li>
                <strong>Base de dados:</strong> um módulo que guarda e protege
                todos os dados da plataforma;
              </li>
              <br />
              <li>
                <strong>Servidor geográfico:</strong> o programa que processa e
                trata os dados presentes na base em mapas digitais e os mantém
                disponíveis na internet;
              </li>
              <br />
              <li>
                <strong>Portal:</strong> é a própria aplicação, acessível no
                endereço (https://pedea.sema.ce.gov/portal) onde é possível
                visualizar e interagir com todos os mapas disponíveis no
                servidor geográfico e em outros servidores disponíveis na
                internet.
              </li>
            </ol>
          </p>
          <strong>Precisa de ajuda para interagir com a plataforma?</strong>

          <div className="containerBttnsInfo">
            <Button
              variant="outline-dark"
              size="lg"
              href="https://pedea.sema.ce.gov.br/portal/manual.pdf"
              target="_blank"
            >
              Consultar manual do usuário
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              href="https://www.sema.ce.gov.br/89965-2/planejamento-costeiro-e-marinho-do-ceara/atlas-digital-costeiro-e-marinho-do-ceara/"
              target="_blank"
            >
              Consultar site do Atlas
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              href="https://www.sema.ce.gov.br/gerenciamento-costeiro/zoneamento-ecologico-economico-da-zona-costeira-zeec/documentos-previos-para-consulta-publica-do-zeec/"
              target="_blank"
            >
              Consultar informações do ZEEC
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              href="https://www.youtube.com/watch?v=TP_4v8EfJZ4"
              target="_blank"
            >
              Vídeo tutorial da plataforma
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              href="https://www.sema.ce.gov.br/89965-2/"
              target="_blank"
            >
              Consultar site do programa CCMA
            </Button>
          </div>
          <p>
            Leia nossos <a className="linksText">Termos e Condições de Uso</a> e{' '}
            <a className="linksText">Aviso de Privacidade.</a>
          </p>
        </Modal.Body>

        <div className="closeBtnInfo">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="customCloseBtn"
          >
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  )
}

ModalHelp.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default ModalHelp
