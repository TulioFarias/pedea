import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useState } from 'react'
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import EditaModalDataExplorer from './modalEditDataExplorer'
import EditDataExplorerCSV from './modalEditDataExplorerCSV';
function EditDataExplorer() {
  const [showModal, setShowModal] = useState(false)
  const [showModalCSV, setShowModalCSV] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleShowModalCSV = () => setShowModalCSV(true)


  const handleCloseModal = () => setShowModal(false)
  const handleCloseModalCSV = () => setShowModalCSV(false)
  return (
    <>
      <div className='containerEdit'>
      <button className="EditDataExplorer" onClick={handleShowModal}>
        <EditNoteRoundedIcon />
        Editar
      </button>
      <button className='editDataExplorerCSV' onClick={handleShowModalCSV}> <NoteAltRoundedIcon/>Editar CSV</button>
      </div>
      
      <EditaModalDataExplorer show={showModal} handleClose={handleCloseModal} />
      <EditDataExplorerCSV show={showModalCSV} handleCloseModalCSV={handleCloseModalCSV}/>
    </>
  )
}

export default EditDataExplorer
