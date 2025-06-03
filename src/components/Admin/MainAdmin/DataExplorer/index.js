
import '../../../../sass/admin/DataExplorer/dataExplorer.scss'
import AddInfoDataExplorer from './buttonsFeaturesDataExplorer/addDataExplorer/addDataExplorer'
import EditDataExplorer from './buttonsFeaturesDataExplorer/editDataExplorer/editDataExplorer'
import RemoveDataExplorer from './buttonsFeaturesDataExplorer/removeDataExplorer/removeDataExplorer'
import TableViewRotulosData from './tablesViews/tableviewallrotulos'
import { useTranslation } from 'react-i18next'
import apiPEDEA from '../../../../services/api'
import { Button } from 'primereact/button'
import ImportFileRotulos from './importCSVDataExplorer/registerFileRotulos'

function DataExplorer() {

  const { t } = useTranslation()
 


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
     
            <ImportFileRotulos/>
       
        </div>
       
          <TableViewRotulosData />
       
      </div>
    </div>
  )
}

export default DataExplorer
