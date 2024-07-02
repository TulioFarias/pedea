import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded'
import React from 'react'
import '../../../../../../sass/admin/DataExplorer/buttonsdataexplore.scss'

function AddInfoDataExplorer() {
  return (
    <>
      <div>
        <button className="ButtonAddDataExplorer">
          <PlaylistAddRoundedIcon />
          Adicionar
        </button>
      </div>
    </>
  )
}

export default AddInfoDataExplorer
