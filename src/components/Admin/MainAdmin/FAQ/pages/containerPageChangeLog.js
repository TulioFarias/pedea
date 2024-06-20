import React, { useState, useEffect } from 'react'
import { Accordion, Form } from 'react-bootstrap'

import '../../../../../sass/admin/FAQ/changeLOG/pagelog.scss'
import logo from '../../../../../assets/img/pedea-logo.png'
import apiPEDEA from '../../../../../services/api'

function PageChangeLogValues() {
  const [valuesLog, setValuesLog] = useState([])

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/allValuesLog')
        setValuesLog(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  return (
    <div className="containerAllValuesLog">
      <div className="containerImgLogo">
        <img src={logo} alt="PEDEA Logo" />
      </div>

      <div className="ContainerAllItemsLog">
        <div className="ContainerAccordion">
          <h1>Histórico Evolutivo da PEDEA:</h1>
          <Accordion className="customAccordion">
            {valuesLog.map((valueData, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  Versão de atualização: {valueData.version}
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Group>
                    <div className="logDates">
                      <Form.Group className="groupDate">
                        <Form.Label className="labelsdate">
                          Atualizado em:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={new Date(valueData.updatedAt).toLocaleString()}
                          readOnly
                          className="inputsdate"
                        />
                      </Form.Group>
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mensagem:</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={valueData.message}
                      readOnly
                      className="inputsdate"
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default PageChangeLogValues
