import PlaylistRemoveRoundedIcon from '@mui/icons-material/PlaylistRemoveRounded'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import DeleteModalDataExplorer from './modalRemoveDataExplorer'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types';
function RemoveDataExplorer({handleTableUpdate}) {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)
  return (
    <>
      <Button className="RemoveDataExplorer" onClick={handleShowModal}>
        <PlaylistRemoveRoundedIcon />
        {t("Remover")}
      </Button>

      <DeleteModalDataExplorer
        show={showModal}
        handleClose={handleCloseModal}
        handleTableUpdate={handleTableUpdate}
      />
    </>
  )
}

RemoveDataExplorer.propTypes = {
    handleTableUpdate: PropTypes.func.isRequired
  };

export default RemoveDataExplorer
