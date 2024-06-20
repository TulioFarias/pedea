import React, { useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'

import '../../../../../sass/admin/FAQ/changeLOG/pagelog.scss'
import logo from '../../../../../assets/img/pedea-logo.png'
import apiPEDEA from '../../../../../services/api'

function PageChangeLogValues() {
  const [valuesLog, setValuesLog] = useState([])

  console.log(valuesLog)

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
    <>
      <div className="containerAllValuesLog">
        <div className="containerImgLogo">
          <img src={logo} />
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
                  <Accordion.Body>{valueData.message}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageChangeLogValues
