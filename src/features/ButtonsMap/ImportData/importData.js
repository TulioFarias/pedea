import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded'
import { Tooltip } from '@mui/material'
import React, { useState } from 'react'

import ModalImport from './modalImportData'

function ImportData() {
  const [show, setShow] = useState(false)

  const showOptionsHelp = () => {
    setShow(true)
  }
  return (
    <>
      <Tooltip title="Importar dados espaciais" placement="left">
        <button className="my-custom-btns" onClick={showOptionsHelp}>
          <ImportExportRoundedIcon />
        </button>
      </Tooltip>
      <ModalImport show={show} setShow={setShow} />
    </>
  )
}

export default ImportData
