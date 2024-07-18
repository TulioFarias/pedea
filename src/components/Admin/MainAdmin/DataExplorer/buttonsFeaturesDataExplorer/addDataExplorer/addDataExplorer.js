import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded'
import React, { useState } from 'react'

import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import ModalAddDataExplorer from './modalDataExplorer/modalAddDataExplorer'

function AddInfoDataExplorer() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <button className="ButtonAddDataExplorer" onClick={handleShowModal}>
        <PlaylistAddRoundedIcon />
        Adicionar
      </button>

      <ModalAddDataExplorer show={showModal} handleClose={handleCloseModal} />
    </>
  )
}

export default AddInfoDataExplorer
