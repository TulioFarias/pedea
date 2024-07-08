import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'
import * as React from 'react'

import api from '../../../../../services/api'
import ModalConfirmDelete from '../modalsRotulos/modalDelete'
import EditModalRotulos from '../modalsRotulos/modalEdit'
import ChangeTableSideBar from './changeTable'

function ContainerInfoRotulos({
  tableUpdated,
  handleTableUpdate,
  setEditItemId,
  editItemId
}) {
  const [rotulosData, setRotulosData] = React.useState([])
  const [tableFilesRotulos, setTableFilesRotulos] = React.useState([])
  const [openModal, setOpenModal] = React.useState(false)
  const [openModalEdit, setOpenModalEdit] = React.useState(false)
  const [showSideBar, setShowSideBar] = React.useState(false)
  const [selectedTable, setSelectedTable] = React.useState('TableRotulos')

  const openSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  React.useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getAllRotulos')
        setRotulosData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    async function loadTableFilesRotulos() {
      try {
        const { data } = await api.get('/getAllRotulosCSV')
        setTableFilesRotulos(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
    loadTableFilesRotulos()
  }, [tableUpdated])

  const openModalNow = () => {
    setOpenModal(true)
  }

  const openEditModalNow = id => {
    setOpenModalEdit(true)
    setEditItemId(id)
  }

  const formatarDataLegivel = dataString => {
    const meses = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]

    const data = new Date(dataString)
    const dia = data.getDate()
    const mes = meses[data.getMonth()]
    const ano = data.getFullYear()
    const horas = data.getHours()
    const minutos = data.getMinutes().toString().padStart(2, '0')

    return `${dia} de ${mes} de ${ano} - ${horas}:${minutos}`
  }

  return (
    <>
      <div className="containerTableInfoRotulos">
        <div className="headerContainerTableRotulos">
          <p className="titleTableRotulos">
            {selectedTable === 'TableRotulos'
              ? 'Tabela de rótulos cadastrados:'
              : 'Tabela de arquivos cadastrados:'}
          </p>
          <button className="BtnChangeTableRotulos" onClick={openSideBar}>
            <TuneRoundedIcon />
          </button>
          <ChangeTableSideBar
            setShowSideBar={setShowSideBar}
            showSideBar={showSideBar}
            setSelectedTable={setSelectedTable}
          />
        </div>

        <TableContainer component={Paper} className="TableRotulos">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {selectedTable === 'TableRotulos' ? (
                  <>
                    <TableCell>ID</TableCell>
                    <TableCell>Chave</TableCell>
                    <TableCell>Português</TableCell>
                    <TableCell>Inglês</TableCell>
                    <TableCell>Espanhol</TableCell>
                    <TableCell>Ações</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Nome</TableCell>
                    <TableCell>Chave ID</TableCell>
                    <TableCell>Tipo do arquivo</TableCell>
                    <TableCell>Arquivo</TableCell>
                    <TableCell>Data de Criação</TableCell>
                    <TableCell>Data de Atualização</TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTable === 'TableRotulos'
                ? rotulosData.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.key}</TableCell>
                      <TableCell>{item.pt_br}</TableCell>
                      <TableCell>{item.en}</TableCell>
                      <TableCell>{item.es}</TableCell>
                      <TableCell>
                        <div className="containerBtnsTableView">
                          <button
                            onClick={() => openEditModalNow(item.id)}
                            className="btnEditCustom"
                          >
                            <EditNoteRoundedIcon />
                          </button>
                          <button
                            onClick={openModalNow}
                            className="btnRemoveCustom"
                          >
                            <DeleteSweepRoundedIcon />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : tableFilesRotulos.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.id_key}</TableCell>
                      <TableCell>{item.type_files}</TableCell>
                      <TableCell>{item.path}</TableCell>
                      <TableCell>
                        {formatarDataLegivel(item.createdAt)}
                      </TableCell>
                      <TableCell>
                        {formatarDataLegivel(item.updatedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalConfirmDelete
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleTableUpdate={handleTableUpdate}
        />
        <EditModalRotulos
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
          handleTableUpdate={handleTableUpdate}
          editItemId={editItemId}
        />
      </div>
    </>
  )
}

ContainerInfoRotulos.propTypes = {
  tableUpdated: PropTypes.bool.isRequired,
  handleTableUpdate: PropTypes.func.isRequired,
  setEditItemId: PropTypes.func.isRequired,
  editItemId: PropTypes.string.isRequired
}

export default ContainerInfoRotulos
