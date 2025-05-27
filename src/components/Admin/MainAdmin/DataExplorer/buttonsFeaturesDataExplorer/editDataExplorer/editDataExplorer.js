import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import EditaModalDataExplorer from './modalEditDataExplorer'
import EditDataExplorerCSV from './modalEditDataExplorerCSV';

import { useTranslation } from 'react-i18next'
function EditDataExplorer() {
  const [showModal, setShowModal] = useState(false)
  const [showModalCSV, setShowModalCSV] = useState(false)
  const { t } = useTranslation()
  const handleShowModal = () => setShowModal(true)
  const handleShowModalCSV = () => setShowModalCSV(true)


  const handleCloseModal = () => setShowModal(false)
  const handleCloseModalCSV = () => setShowModalCSV(false)
  return (
    <>
      <div className='containerEdit'>
      <Button className="EditDataExplorer" onClick={handleShowModal}>
        <EditNoteRoundedIcon />
        {t("Editar")}
      </Button>
      <Button className='editDataExplorerCSV' onClick={handleShowModalCSV}> <NoteAltRoundedIcon/>{t("Editar (.CSV)")}</Button>
      </div>
      
      <EditaModalDataExplorer show={showModal} handleClose={handleCloseModal} />
      <EditDataExplorerCSV show={showModalCSV} handleCloseModalCSV={handleCloseModalCSV}/>
    </>
  )
}

export default EditDataExplorer
