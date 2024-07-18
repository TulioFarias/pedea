import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useState, useEffect } from 'react'
import * as React from 'react'

import apiPEDEA from '../../../../services/api'

function TableViewRotulosData() {
  const [dataExplorer, setDataExplorer] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    async function getInfoDataExplorer() {
      try {
        const { data } = await apiPEDEA.get('/infoDataExplorer')
        const sortedData = data.sort((a, b) => a.id - b.id)
        setDataExplorer(sortedData)
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error)
      }
    }

    getInfoDataExplorer()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const formatTimestamp = timestamp => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="ContainerTableRotulosData">
      <h2>Tabela ativa de rótulos do explorador de dados:</h2>
      <hr />
      <div className="TableViewRotulos">
        <Paper className="ContainerTableView">
          <TableContainer className="viewTable">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Categoria de Informação</TableCell>
                  <TableCell>Classe Maior</TableCell>
                  <TableCell>Subclasse Maior</TableCell>
                  <TableCell>Classe Menor</TableCell>
                  <TableCell>Nomenclatura PEDEA</TableCell>
                  <TableCell>Fonte</TableCell>
                  <TableCell>Coluna Atributo</TableCell>
                  <TableCell>Link Drive SHP</TableCell>
                  <TableCell>Link Drive KML</TableCell>
                  <TableCell>Chave vinculada</TableCell>
                  <TableCell>Criado em</TableCell>
                  <TableCell>Atualizado em</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataExplorer
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(item => (
                    <TableRow key={item.id} hover role="checkbox" tabIndex={-1}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.categoria_de_informacao}</TableCell>
                      <TableCell>{item.classe_maior}</TableCell>
                      <TableCell>{item.sub_classe_maior}</TableCell>
                      <TableCell>{item.classe_menor}</TableCell>
                      <TableCell>{item.nomenclatura_pedea}</TableCell>
                      <TableCell>{item.fonte}</TableCell>
                      <TableCell>{item.coluna_atributo}</TableCell>
                      <TableCell>{item.link_drive_shp}</TableCell>
                      <TableCell>{item.link_drive_kml}</TableCell>
                      <TableCell>{item.key_rotulo}</TableCell>
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
            count={dataExplorer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="containerPagination"
          />
        </Paper>
      </div>
    </div>
  )
}

export default TableViewRotulosData
