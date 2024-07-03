import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useState } from 'react'

import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import EditaModalDataExplorer from './modalEditDataExplorer'
function EditDataExplorer() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  return (
    <>
      <div>
        <button className="EditDataExplorer" onClick={handleShowModal}>
          <EditNoteRoundedIcon />
          Editar
        </button>
        <EditaModalDataExplorer
          show={showModal}
          handleClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export default EditDataExplorer
