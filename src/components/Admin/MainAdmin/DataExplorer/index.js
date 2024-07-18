import React from 'react'

import '../../../../sass/admin/DataExplorer/dataExplorer.scss'
import AddInfoDataExplorer from './buttonsFeaturesDataExplorer/addDataExplorer/addDataExplorer'
import EditDataExplorer from './buttonsFeaturesDataExplorer/editDataExplorer/editDataExplorer'
import RemoveDataExplorer from './buttonsFeaturesDataExplorer/removeDataExplorer/removeDataExplorer'
import ContainerImportCSV from './importCSVDataExplorer/importCSV'
import TableViewRotulosData from './tableviewallrotulos'

import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Tooltip } from '@mui/material'
function DataExplorer() {
  const textExemple =
    'O arquivo .CSV a ser importado precisa ter a sua primeira linha definida apenas com nomes de campos. Dentre estes campos, um precisa se chamar "Latitude" e outro "Longitude". As demais linhas precisam ter dados vinculados aos campos definidos na primeira linha. Dados de latitude e longitude precisam estar em graus decimais e projeção SIRGAS 2000, EPSG 4674. Procure usar '

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

            <div className="containerToltip">
              <Tooltip title={textExemple} className="toltip">
                <InfoRoundedIcon />
              </Tooltip>
              <a className="linktoltip">Exemplo como arquivo .CSV </a>
            </div>

            <ContainerImportCSV />
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
