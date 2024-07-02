import React from 'react'

import TableViewRotulosData from './tableviewallrotulos'
import '../../../../sass/admin/DataExplorer/dataExplorer.scss'
import AddInfoDataExplorer from './buttonsFeaturesDataExplorer/addDataExplorer/addDataExplorer'
function DataExplorer() {
  return (
    <>
      <div className="containerWrapperOptions">
        <div className="ContainerAllInfoDataExplorer">
          <div className="ContainerButtonsDataExplorer">
            <AddInfoDataExplorer />
          </div>
          <div className="ContainerTableViewRotulos">
            <TableViewRotulosData />
          </div>
        </div>
      </div>
    </>
  )
}

export default DataExplorer
