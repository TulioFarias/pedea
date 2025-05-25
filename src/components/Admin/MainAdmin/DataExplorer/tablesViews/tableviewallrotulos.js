

  import { useState, useEffect , useRef} from 'react';
  import apiPEDEA from '../../../../../services/api';
  import '../../../../../sass/admin/DataExplorer/dataExplorer.scss'
  import { useTranslation } from 'react-i18next'
  import { DataTable } from 'primereact/datatable';
  import { Column } from 'primereact/column';
  import BackupTableIcon from '@mui/icons-material/BackupTable';
  import { InputText } from 'primereact/inputtext';
  import { FloatLabel } from 'primereact/floatlabel';
  import { SplitButton } from 'primereact/splitbutton';
  import { Toast } from 'primereact/toast';
  import ChangeTable from './tablefilesDataExplorer';



  function TableViewRotulosData() {
    const [dataExplorer, setDataExplorer] = useState([]);
    const [tableFilesRotulos, setTableFilesRotulos] = useState([]);
    const [tableFilesCSVEdit, setTableFilesCSVEdit] = useState([])
    const [selectedTable, setSelectedTable] = useState('TableRotulos');
    const [showSideBar, setShowSideBar] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);
    const toast = useRef(null);
    
    const { t } = useTranslation()

    useEffect(() => {
      async function getInfoDataExplorer() {
        try {
          const { data } = await apiPEDEA.get('/infoDataExplorer');
          const sortedData = data.sort((a, b) => a.id - b.id);
          setDataExplorer(sortedData);
        } catch (error) {
          console.error('Erro ao buscar os dados do usuário:', error);
        }
      }

      async function loadTableFilesRotulos() {
        try {
          const { data } = await apiPEDEA.get('/getAllRotulosCSV');
          setTableFilesRotulos(data);
        } catch (error) {
          console.error('Erro ao buscar os dados dos arquivos:', error);
        }
      }

      async function loadTableFilesCSVEdit() {
        try {
          const { data } = await apiPEDEA.get('/infoAllCSVDataExplorerEdit');
          setTableFilesCSVEdit(data);
        } catch (error) {
          console.error('Erro ao buscar os dados dos arquivos:', error);
        }
      }

      loadTableFilesCSVEdit()
      getInfoDataExplorer();
      loadTableFilesRotulos();
    }, []);



    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    };

    const openSideBar = () => {
      setShowSideBar(!showSideBar);
    };

    const handleDownloadTable = async () => {

      try {
        const response = await apiPEDEA.get('/downloadExploradorDados', {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tabela-explorador-dados.csv'; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao iniciar o download da tabela:', error);
      }
    };

      const items = [
    {
      label: 'Trocar tabela',
      icon: 'pi pi-table',
      command: () => openSideBar()
    },
    {
      label: 'Baixar tabela',
      icon: 'pi pi-download',
      command: () =>{
        handleDownloadTable()
        toast.current.show({
        severity: 'success',
        summary: 'Baixando...',
        detail: 'O arquivo está sendo baixado!',
        life: 2000
      });
      }
    }
  ];


    const header = (
      <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

        <h3 style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <BackupTableIcon/>
            {selectedTable === 'TableRotulos'
              ? t('Tabela de rótulos ativos no explorador de dados:')
              : selectedTable === 'FilesRotulos'
              ? t('Tabela de arquivos cadastrados:')
              : t('Tabela de arquivos em edição:')}
          </h3>


          <div style={{ display: 'flex', msFlexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <FloatLabel>
            <InputText
              id="busca"
              type="search"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <label htmlFor="busca">Pesquisar...</label>
          </FloatLabel>

          <div className="card flex justify-content-center">
            <Toast ref={toast} className='toastdownload'/>
            <SplitButton
              label="Tabelas"
              model={items}
              severity="secondary"
              rounded
              className="tabelas-split"
            
            />
          </div>
          </div>

        
        </div>
    );


    return (
      <div className="ContainerTableRotulosData">
      
            {selectedTable === 'TableRotulos' && (
              <DataTable
                ref={dt}
                value={dataExplorer}
                header={header}
                globalFilter={globalFilter}
                dataKey="id"
                emptyMessage="Nenhum dado encontrado."
                stripedRows
                paginator rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem', height: '37.4rem'}}
              >
                <Column field="id" header="ID" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>
                        
                <Column field="categoria_de_informacao" header="Categoria de Informação" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="classe_maior" header="Classe Maior" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="sub_classe_maior" header="Subclasse Maior" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="classe_menor" header="Classe Menor" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="coluna_atributo" header="Coluna Atributo" style={{ width: '10%' }} 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="nomenclatura_greencloud" header="Nomenclatura GreenCloud" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="nomenclatura_pedea" header="Nomenclatura PEDEA" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="fonte" header="Fonte" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="modulos_graficos" header="Módulos de Gráficos" 
                        body={(rowData) => (rowData.modulos_graficos ? 'Sim' : 'Não')} 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="link_drive_shp" header="Link Drive SHP" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="link_drive_kml" header="Link Drive KML" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="key_rotulo" header="Chave vinculada" 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column header="Enviado por" 
                        body={(rowData) => rowData.user?.name || ''}
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }} />

                <Column field="createdAt" header="Criado em" 
                        body={(rowData) => formatTimestamp(rowData.createdAt)} 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>

                <Column field="updatedAt" header="Atualizado em" 
                        body={(rowData) => formatTimestamp(rowData.updatedAt)} 
                        headerStyle={{ textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center' }}/>
              </DataTable>
            )}

            {selectedTable === 'FilesRotulos' && (
              <DataTable
                ref={dt}
                value={tableFilesRotulos} 
                header={header}
                globalFilter={globalFilter}
                dataKey="id"
                emptyMessage="Nenhum arquivo cadastrado."
                stripedRows
                paginator rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
              >
                <Column field="id" header="ID" />
                <Column field="path" header="Nome do Arquivo" />
                <Column field="user.name" header="Enviado por" body={(rowData) => rowData.user?.name || ''} />
                <Column field="createdAt" header="Data de Criação" body={(rowData) => formatTimestamp(rowData.createdAt)} />
                <Column field="updatedAt" header="Data de Atualização" body={(rowData) => formatTimestamp(rowData.updatedAt)} />
              </DataTable>
            )}

            {selectedTable === 'FilesEdit' && (
              <DataTable
                ref={dt}
                value={tableFilesCSVEdit}
                header={header}
                globalFilter={globalFilter}
                dataKey="id"
                emptyMessage="Nenhum rótulo em edição."
                stripedRows
                paginator rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
              >
                <Column field="id" header="ID" />
                <Column field="name" header="Nome do Arquivo" />
                <Column field="user.name" header="Enviado por" body={(rowData) => rowData.user?.name || ''} />
                <Column field="createdAt" header="Data de Criação" body={(rowData) => formatTimestamp(rowData.createdAt)} />
                <Column field="updatedAt" header="Data de Atualização" body={(rowData) => formatTimestamp(rowData.updatedAt)} />
              </DataTable>
            )}
    


            <ChangeTable
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          setSelectedTable={setSelectedTable}
        />
      </div>
    );
  }

  export default TableViewRotulosData;