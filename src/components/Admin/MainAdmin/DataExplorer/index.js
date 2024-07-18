import React from 'react'

import '../../../../sass/admin/DataExplorer/dataExplorer.scss'
import AddInfoDataExplorer from './buttonsFeaturesDataExplorer/addDataExplorer/addDataExplorer'
import EditDataExplorer from './buttonsFeaturesDataExplorer/editDataExplorer/editDataExplorer'
import RemoveDataExplorer from './buttonsFeaturesDataExplorer/removeDataExplorer/removeDataExplorer'
import ContainerImportCSV from './importCSVDataExplorer/importCSV'
import TableViewRotulosData from './tableviewallrotulos'

function DataExplorer() {
  return (
    <>
      <div className="containerWrapperOptions">
        <div className="ContainerAllInfoDataExplorer">
          <div className="ContainerButtonsDataExplorer">
            <p>
              Use os botões abaixo para adicionar, editar ou excluir rótulos no
              explorador de dados.
            </p>

            <div className="ContainerButtonsFeatures">
              <AddInfoDataExplorer />
              <EditDataExplorer />
              <RemoveDataExplorer />
            </div>

            <hr />

            <p>
              Para adicionar dados atraves de um arquivo csv, basta seguir o
              exemplo:
            </p>

            <div>
              <ContainerImportCSV />
            </div>
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
