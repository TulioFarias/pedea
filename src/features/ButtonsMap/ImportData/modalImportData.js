import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import '../../../sass/btns-map/importModal.scss'
function ModalImport({ show, setShow }) {
  const handleClose = () => {
    setShow(false)
  }

  const [csvFile, setCsvFile] = useState(null)
  const handleCsvFileChange = e => {
    setCsvFile(e.target.files[0])
  }
  const handleCsvFileReset = () => {
    setCsvFile(null)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Importar dados espaciais</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className=" mb-3">
            <Form.Label className="input-group ">
              Importar pontos de um arquivo CSV:
            </Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <div>
            <p className="textInport">
              O arquivo .CSV a ser importado precisa ter a sua primeira linha
              definida apenas com nomes de campos. Dentre estes campos, um
              precisa se chamar Latitude e outro Longitude. As demais linhas
              precisam ter dados vinculados aos campos definidos na primeira
              linha. Dados de latitude e longitude precisam estar em graus
              decimais e projeção SIRGAS 2000, EPSG 4674. Procure usar como
              delimitador do arquivo .CSV a ser importado.
            </p>
            <a
              className="linkImport"
              href="/portal/template.csv"
              rel="noreferrer"
              download
            >
              Acesse o template de arquivo .CSV
            </a>
          </div>

          <hr />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              Importar geometrias de um arquivo Shapefile:
            </Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <div>
            <p className="textInport">
              Os formatos geométricos suportados para importar um Shapefile
              (.shp) são: Point; LineString; e Polygon. Tipos como MultiPoint,
              MultiLineString, MultiPolygon, e GeometryCollection não são
              suportados.
            </p>
          </div>

          <hr />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Importar geometrias de um arquivo KML:</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

ModalImport.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}

export default ModalImport
