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
    'O arquivo .CSV a ser importado precisa ter a sua primeira linha definida apenas com nomes de campos. Entre estes campos, um precisa se chamar "ID", outro "Categoria de Informação", e assim por diante, conforme o exemplo: "ID", "Categoria de Informação", "Classe Maior", "Subclasse Maior", "Classe Menor", "Nomenclatura Greencloud", "Nomenclatura PEDEA", "Fonte", "Coluna Atributo", "Link Drive SHP", "Link Drive KML". As demais linhas precisam conter dados correspondentes aos campos definidos na primeira linha. Certifique-se de que o arquivo esteja em UTF-8.'

  return (
    <div className="containerWrapperOptions">
      <div className="ContainerAllInfoDataExplorer">
        <div className="ContainerButtonsDataExplorer">
          <p>
            Use os botões abaixo para adicionar, editar ou excluir rótulos no
            explorador de dados
          </p>
          <div className="ContainerButtonsFeatures">
            <AddInfoDataExplorer />
            <EditDataExplorer />
            <RemoveDataExplorer />
          </div>
          <hr />
          <p>
            Para adicionar dados através de um arquivo CSV, basta seguir o
            exemplo
          </p>
          <div className="containerToltip">
            <Tooltip title={textExemple} className="toltip">
              <InfoRoundedIcon />
            </Tooltip>
            <a className="linktoltip">Exemplo como arquivo .CSV</a>
          </div>
          <ContainerImportCSV />
        </div>
        <div className="ContainerTableViewRotulos">
          <TableViewRotulosData />
        </div>
      </div>
    </div>
  )
}

export default DataExplorer