import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../../../../sass/admin/FAQ/changeLOG/changelog.scss'
import apiPEDEA from '../../../../../services/api'
import ModalChangeLogDelete from './modalsChangeLogs/modalDeleteChangeLog'
import ModalEditChangeLog from './modalsChangeLogs/modalEditChangeLog'

import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Button } from 'primereact/button'
import { ButtonGroup } from 'primereact/buttongroup'
import { Carousel } from 'primereact/carousel'

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
        console.error('Error fetching change log data:', error)
      }
    }

    loadRotulosData()
  }, [])

  const openModalNow = (id) => {
    setOpenModalEdit(true)
    setIdEditValueLog(id)
  }

  const openModalDeleteLog = (id) => {
    setOpenModalDelete(true)
    setIdEditValueLog(id)
  }

  const logTemplate = (log, index) => {
    return (
      <Card key={index} className="FAQCard">
        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t('Versão da atualização:')}</label>
          <InputText
            value={log.version}
            readOnly
            className="inputValuesFAQ p-inputtext-sm valueInputCustom"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t('Mensagem de atualização:')}</label>
          <InputTextarea
            value={log.message}
            readOnly
            className="inputValuesFAQ p-inputtextarea-sm valueInputCustom"
            rows={4}
            style={{ width: '100%' , borderRadius: '10px'}}
          />
        </div>

        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t('Criado em:')}</label>
          <InputText
            value={new Date(log.createdAt).toLocaleString()}
            readOnly
            className="inputValuesFAQ p-inputtext-sm valueInputCustom"
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>

        <div className="faqInputGroup">
          <label className="LabelFAQEditAndDelete">{t('Atualizado em:')}</label>
          <InputText
            value={new Date(log.updatedAt).toLocaleString()}
            readOnly
            className="inputValuesFAQ p-inputtext-sm valueInputCustom"
            style={{ width: '100%' , borderRadius: '10px'}}
          />
        </div>

        <ButtonGroup className="ButtonGroupFAQ">
          <Button
            label={t("Editar")}
            icon="pi pi-pencil"
            severity="warning"
            onClick={() => openModalNow(log.id)}
            className='btnEditarFaq'
          />
          <Button
            label={t("Deletar")}
            icon="pi pi-trash"
            severity="danger"
            onClick={() => openModalDeleteLog(log.id)}
            className='btnDeleteFaq'
          />
        </ButtonGroup>
      </Card>
    )
  }

  return (
    <>
      <div className="containerShowChangeLog">

        <Carousel
          value={dataChangeLog}
          itemTemplate={logTemplate}
          numVisible={1}
          numScroll={1}
          circular
          showIndicators
          showNavigators
          className="FAQCarousel"
        />
      </div>

      <ModalEditChangeLog
        openModalEdit={openModalEdit}
        setOpenModalEdit={setOpenModalEdit}
        idEditValueLog={idEditValueLog}
      />

      <ModalChangeLogDelete
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        idEditValueLog={idEditValueLog}
      />
    </>
  )
}

export default ShowAndEditChangeLog
