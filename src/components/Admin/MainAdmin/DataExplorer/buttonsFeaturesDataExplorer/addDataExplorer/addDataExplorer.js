import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded'
import React, { useState } from 'react'
import { Button } from 'primereact/button'
import PropTypes from 'prop-types';
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'
import ModalAddDataExplorer from './modalDataExplorer/modalAddDataExplorer'
import { useTranslation } from 'react-i18next'
function AddInfoDataExplorer({handleTableUpdate}) {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <Button  className="ButtonAddDataExplorer" onClick={handleShowModal}>
        <PlaylistAddRoundedIcon />
       {t("Adicionar")}
      </Button>

      <ModalAddDataExplorer show={showModal} handleClose={handleCloseModal} handleTableUpdate={handleTableUpdate}/>
    </>
  )
}

AddInfoDataExplorer.propTypes = {
    handleTableUpdate: PropTypes.func.isRequired
  };

export default AddInfoDataExplorer
