import React, { useState, useEffect } from 'react'
import { Accordion } from 'react-bootstrap'

import apiPEDEA from '../../../../services/api'

function PageFAQ() {
  const [valuesFAQ, setValuesFAQ] = useState([])

  console.log(valuesFAQ)

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/allValuesFAQ')

        setValuesFAQ(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  return (
    <div>
      <h1>Perguntas Frequentes</h1>
      <Accordion>
        {valuesFAQ.map((valueData, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>{valueData.question}</Accordion.Header>
            <Accordion.Body>{valueData.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

export default PageFAQ
