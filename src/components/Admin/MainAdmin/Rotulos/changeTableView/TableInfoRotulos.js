import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useEffect, useState } from 'react'
import '../../../../../sass/admin/Rotulos/rotulos.scss'
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'

import api from '../../../../../services/api'
import ModalConfirmDelete from '../modalsRotulos/modalDelete'
import EditModalRotulos from '../modalsRotulos/modalEdit'
import ChangeTableSideBar from './changeTable'

function ContainerInfoRotulos({
  tableUpdated,
  setDataInfoKey,
  handleTableUpdate,
  setEditItemId,
  editItemId
}) {
  const [rotulosData, setRotulosData] = useState([])
  const [tableFilesRotulos, setTableFilesRotulos] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [selectedTable, setSelectedTable] = useState('TableRotulos')

  const openSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getAllRotulos')

        setRotulosData(data)
        setDataInfoKey(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    async function loadTableFilesRotulos() {
      try {
        const { data } = await api.get('/getAllRotulosCSV')

        setTableFilesRotulos(data)
        setDataInfoKey(data)
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

        {selectedTable === 'TableRotulos' ? (
          <Table striped bordered hover className="TableRotulos">
            <thead>
              <tr>
                <th>ID</th>
                <th>Chave</th>
                <th>Português</th>
                <th>Inglês</th>
                <th>Espanhol</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rotulosData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.key}</td>
                  <td>{item.pt_br}</td>
                  <td>{item.en}</td>
                  <td>{item.es}</td>
                  <td className="ActionCollumCustomRotulosTable">
                    <Button
                      variant="secondary"
                      onClick={() => openEditModalNow(item.id)}
                    >
                      <EditNoteRoundedIcon />
                    </Button>
                    <Button variant="danger" onClick={openModalNow}>
                      <DeleteSweepRoundedIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Table striped bordered hover className="TableRotulos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Chave ID</th>
                <th>Tipo do arquivo</th>
                <th>Arquivo</th>
                <th>Data de Criação</th>
                <th>Data de Atualização</th>
              </tr>
            </thead>
            <tbody>
              {tableFilesRotulos.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.id_key}</td>
                  <td>{item.type_files}</td>
                  <td>{item.path}</td>
                  <td>{formatarDataLegivel(item.createdAt)}</td>
                  <td>{formatarDataLegivel(item.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

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
  setDataInfoKey: PropTypes.func.isRequired,
  setEditItemId: PropTypes.func.isRequired,
  editItemId: PropTypes.string.isRequired
}

export default ContainerInfoRotulos
