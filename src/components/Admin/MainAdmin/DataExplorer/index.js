import React from 'react'

import '../../../../sass/admin/DataExplorer/dataExplorer.scss'
import AddInfoDataExplorer from './buttonsFeaturesDataExplorer/addDataExplorer/addDataExplorer'
import EditDataExplorer from './buttonsFeaturesDataExplorer/editDataExplorer/editDataExplorer'
import RemoveDataExplorer from './buttonsFeaturesDataExplorer/removeDataExplorer/removeDataExplorer'
import ContainerImportCSV from './importCSVDataExplorer/importCSV'
import TableViewRotulosData from './tablesViews/tableviewallrotulos'
import { useTranslation } from 'react-i18next'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import { Tooltip } from '@mui/material'
import apiPEDEA from '../../../../services/api'

function DataExplorer() {

  const { t } = useTranslation()
  const textExemple =
    'O arquivo .CSV a ser importado precisa ter a sua primeira linha definida apenas com nomes de campos. Entre estes campos, um precisa se chamar "ID", outro "Categoria de Informação", e assim por diante, conforme o exemplo: "ID", "Categoria de Informação", "Classe Maior", "Subclasse Maior", "Classe Menor", "Nomenclatura Greencloud", "Nomenclatura PEDEA", "Fonte", "Coluna Atributo", "Link Drive SHP", "Link Drive KML". As demais linhas precisam conter dados correspondentes aos campos definidos na primeira linha. Certifique-se de que o arquivo esteja em UTF-8.'


    const handleDownload = async () => {
      try {
          const response = await apiPEDEA.get('/downloadExemple', {
              responseType: 'blob', 
          });
  
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'arquivo-exemplo.csv'; 
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
      } catch (error) {
          console.error('Erro ao iniciar o download:', error);
      }
  };

  return (
    <div className="containerWrapperOptions">
      <div className="ContainerAllInfoDataExplorer">
        <div className="ContainerButtonsDataExplorer">
          <div className="containerOne">
            <p>
              {t("Use os botões abaixo para adicionar, editar ou excluir rótulos no explorador de dados.")}
            </p>
            <div className="ContainerButtonsFeatures">
              <AddInfoDataExplorer />
              <EditDataExplorer />
              <RemoveDataExplorer />
            </div>
          </div>

          <hr />

          <div className="containerTwo">
          
            <div className="containerToltip">
              <Tooltip title={textExemple} className="toltip">
                <InfoRoundedIcon />
              </Tooltip>
              <a className="linktoltip" href="#" onClick={handleDownload}>{t("Exemplo como arquivo .CSV")}</a>
            </div>
          </div>
          <div className="containerThree">
            <ContainerImportCSV />
          </div>
        </div>
       
          <TableViewRotulosData />
       
      </div>
    </div>
  )
}

export default DataExplorer
