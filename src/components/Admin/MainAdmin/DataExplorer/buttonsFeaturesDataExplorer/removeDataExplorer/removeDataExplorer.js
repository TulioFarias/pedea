import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded'
import React, { useState } from 'react'

import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import DeleteModalDataExplorer from './modalRemoveDataExplorer'
function RemoveDataExplorer() {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  return (
    <>
      <div>
        <button className="RemoveDataExplorer" onClick={handleShowModal}>
          <PlaylistRemoveRoundedIcon />
          Remover
        </button>

        <DeleteModalDataExplorer
          show={showModal}
          handleClose={handleCloseModal}
        />
      </div>
    </>
  )
}

export default RemoveDataExplorer
