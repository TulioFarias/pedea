import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import EditaModalDataExplorer from './modalEditDataExplorer'
import EditDataExplorerCSV from './modalEditDataExplorerCSV';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next'
function EditDataExplorer({handleTableUpdate}) {
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
      
      <EditaModalDataExplorer show={showModal} handleClose={handleCloseModal} handleTableUpdate={handleTableUpdate}/>
      <EditDataExplorerCSV show={showModalCSV} handleCloseModalCSV={handleCloseModalCSV} handleTableUpdate={handleTableUpdate}/>
    </>
  )
}

EditDataExplorer.propTypes = {
    handleTableUpdate: PropTypes.func.isRequired
  };

export default EditDataExplorer
