import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded'
import React, { useState } from 'react'

import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import ModalAddDataExplorer from './modalAddDataExplorer'

function AddInfoDataExplorer() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <div>
        <button className="ButtonAddDataExplorer" onClick={handleShowModal}>
          <PlaylistAddRoundedIcon />
          Adicionar
        </button>
      </div>
      <ModalAddDataExplorer show={showModal} handleClose={handleCloseModal} />
    </>
  )
}

export default AddInfoDataExplorer
