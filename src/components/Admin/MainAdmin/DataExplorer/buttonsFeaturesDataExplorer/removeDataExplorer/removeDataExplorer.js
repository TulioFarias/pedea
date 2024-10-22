import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded'
import React, { useState } from 'react'

import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import DeleteModalDataExplorer from './modalRemoveDataExplorer'
import { useTranslation } from 'react-i18next'
function RemoveDataExplorer() {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  return (
    <>
      <button className="RemoveDataExplorer" onClick={handleShowModal}>
        <PlaylistRemoveRoundedIcon />
        {t("Remover")}
      </button>

      <DeleteModalDataExplorer
        show={showModal}
        handleClose={handleCloseModal}
      />
    </>
  )
}

export default RemoveDataExplorer
