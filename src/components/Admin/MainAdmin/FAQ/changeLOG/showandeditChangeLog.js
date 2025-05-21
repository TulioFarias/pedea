import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import DrawRoundedIcon from '@mui/icons-material/DrawRounded'
import React, { useEffect, useState } from 'react'
import { Carousel, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next' 
import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss'
import apiPEDEA from '../../../../../services/api'
import ModalChangeLogDelete from './modalsChangeLogs/modalDeleteChangeLog'
import ModalEditChangeLog from './modalsChangeLogs/modalEditChangeLog'

function ShowAndEditChangeLog() {
  const { t } = useTranslation() 
  const [dataChangeLog, setDataChangeLog] = useState([])
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [idEditValueLog, setIdEditValueLog] = useState(null)

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

  const openModalNow = id => {
    console.log(id)
    setOpenModalEdit(true)
    setIdEditValueLog(id)
  }

  const OpenModalDeleteLog = id => {
    setOpenModalDelete(true)
    setIdEditValueLog(id)
  }

  return (
    <>
  
        <div className="containerShowChangeLog">
          <p>{t('Todas as atualizações de log estão abaixo:')}</p>
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
                      {t('Versão da atualização:')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={log.version}
                      readOnly
                      className="inputgroupone"
                    />
                  </Form.Group>
                  <Form.Group className="groupItemsTwo">
                    <Form.Label className="labelmsg">{t('Mensagem de atualização:')}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={log.message}
                      readOnly
                      className='inputTxtArea'
                    />
                  </Form.Group>
                  <div className="logDates">
                    <Form.Group className="groupDate">
                      <Form.Label className="labelsdate">{t('Criado em:')}</Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(log.createdAt).toLocaleString()}
                        readOnly
                        className="inputsdate"
                      />
                    </Form.Group>
                    <Form.Group className="groupDate">
                      <Form.Label className="labelsdate">
                        {t('Atualizado em:')}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={new Date(log.updatedAt).toLocaleString()}
                        readOnly
                        className="inputsdate"
                      />
                    </Form.Group>
                    <div className="containerBtnsChangeLog">
                      <Button
                        className="btnEditChangeLog"
                        onClick={() => openModalNow(log.id)}
                      >
                        <DrawRoundedIcon />
                      </Button>
                      <Button
                        className="btnDeleteChangeLog"
                        onClick={() => OpenModalDeleteLog(log.id)}
                      >
                        <DeleteForeverRoundedIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
    

      <ModalEditChangeLog
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        idEditValueLog={idEditValueLog}
      />

      <ModalChangeLogDelete
        idEditValueLog={idEditValueLog}
        setOpenModalDelete={setOpenModalDelete}
        openModalDelete={openModalDelete}
      />
    </>
  )
}

export default ShowAndEditChangeLog

