
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { useState, useEffect } from 'react';
import apiPEDEA from '../../../../../services/api';
import '../../../../../sass/admin/DataExplorer/dataExplorer.scss'
import ChangeTable from './tablefilesDataExplorer';

function TableViewRotulosData() {
  const [dataExplorer, setDataExplorer] = useState([]);
  const [tableFilesRotulos, setTableFilesRotulos] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTable, setSelectedTable] = useState('TableViewRotulos');
  const [showSideBar, setShowSideBar] = useState(false);


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

    getInfoDataExplorer();
    loadTableFilesRotulos();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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



  return (
    <div className="ContainerTableRotulosData">
      <div className="headerContainerTableRotulos">
        <h2>
          {selectedTable === 'TableRotulos'
            ? 'Tabela de rótulos ativos no exporador de dados:'
            : 'Tabela de arquivos cadastrados:'}
        </h2>
        <button className="BtnChangeTableRotulos" onClick={openSideBar}>
          <TuneRoundedIcon />
      </button>

      </div>
      
      <div className="TableViewRotulos">
        <Paper className="ContainerTableView">
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {selectedTable === 'TableRotulos' ? (
                    <>
                      <TableCell>ID</TableCell>
                      <TableCell>Categoria de Informação</TableCell>
                      <TableCell>Classe Maior</TableCell>
                      <TableCell>Subclasse Maior</TableCell>
                      <TableCell>Classe Menor</TableCell>
                      <TableCell>Nomenclatura GreenCloud</TableCell>
                      <TableCell>Nomenclatura PEDEA</TableCell>
                      <TableCell>Fonte</TableCell>
                      <TableCell>Coluna Atributo</TableCell>
                      <TableCell>Link Drive SHP</TableCell>
                      <TableCell>Link Drive KML</TableCell>
                      <TableCell>Chave vinculada</TableCell>
                      <TableCell>Criado em</TableCell>
                      <TableCell>Atualizado em</TableCell>
                      <TableCell>Ações</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>Nome</TableCell>
                      <TableCell>Arquivo</TableCell>
                      <TableCell>Data de Criação</TableCell>
                      <TableCell>Data de Atualização</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTable === 'TableRotulos'
                  ? dataExplorer
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(item => (
                      <TableRow key={item.id} hover role="checkbox" tabIndex={-1}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.categoria_de_informacao}</TableCell>
                        <TableCell>{item.classe_maior}</TableCell>
                        <TableCell>{item.sub_classe_maior}</TableCell>
                        <TableCell>{item.classe_menor}</TableCell>
                        <TableCell>{item.nomenclatura_greencloud}</TableCell>
                        <TableCell>{item.nomenclatura_pedea}</TableCell>
                        <TableCell>{item.fonte}</TableCell>
                        <TableCell>{item.coluna_atributo}</TableCell>
                        <TableCell>{item.link_drive_shp}</TableCell>
                        <TableCell>{item.link_drive_kml}</TableCell>
                        <TableCell>{item.key_rotulo}</TableCell>
                        <TableCell>{formatTimestamp(item.createdAt)}</TableCell>
                        <TableCell>{formatTimestamp(item.updatedAt)}</TableCell>

                      </TableRow>
                    ))
                  : tableFilesRotulos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.path}</TableCell>
                        <TableCell>{formatTimestamp(item.createdAt)}</TableCell>
                        <TableCell>{formatTimestamp(item.updatedAt)}</TableCell>

                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={selectedTable === 'TableRotulos' ? dataExplorer.length : tableFilesRotulos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>

      <ChangeTable
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        setSelectedTable={setSelectedTable}
      />
    </div>
  );
}

export default TableViewRotulosData;