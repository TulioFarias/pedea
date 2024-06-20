import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DrawRoundedIcon from '@mui/icons-material/DrawRounded'
import React, { useEffect, useState } from 'react'
import { Carousel, Form, Button } from 'react-bootstrap'

import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss'
import apiPEDEA from '../../../../../services/api'

function ShowAndEditChangeLog() {
  const [dataChangeLog, setDataChangeLog] = useState([])

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await apiPEDEA.get('/allValuesLog')
        setDataChangeLog(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  return (
    <>
      <div>
        <div className="containerShowChangeLog">
          <p>Todas as atualizações de log estão abaixo:</p>
          <Carousel
            interval={null}
            controls={true}
            className="carouselCustomChangeLog"
          >
            {dataChangeLog.map((log, index) => (
              <Carousel.Item key={index} className="containerCarousel">
                <div className="containerItemsDataChangeLog">
                  <Form.Group className="groupItemOne">
                    <Form.Label className="labelgroupone">
                      Versão da atualização:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={log.version}
                      readOnly
                      className="inputgroupone"
                    />
                  </Form.Group>
                  <Form.Group className="groupItemsTwo">
                    <Form.Label>Mensagem de atualização:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={log.message}
                      readOnly
                    />
                  </Form.Group>
                  <div className="logDates">
                    <Form.Group className="groupDate">
                      <Form.Label className="labelsdate">Criado em:</Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(log.createdAt).toLocaleString()}
                        readOnly
                        className="inputsdate"
                      />
                    </Form.Group>
                    <Form.Group className="groupDate">
                      <Form.Label className="labelsdate">
                        Atualizado em:
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(log.updatedAt).toLocaleString()}
                        readOnly
                        className="inputsdate"
                      />
                    </Form.Group>
                    <div className="containerBtnsChangeLog">
                      <Button className="btnEditChangeLog">
                        <DrawRoundedIcon />
                      </Button>
                      <Button className="btnDeleteChangeLog">
                        <DeleteForeverRoundedIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default ShowAndEditChangeLog
