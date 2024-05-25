import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useEffect, useState } from 'react'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { Table, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'

import api from '../../../../services/api'
import ModalConfirmDelete from './modalsRotulos/modalDelete'
import EditModalRotulos from './modalsRotulos/modalEdit'

function ContainerInfoRotulos({
  tableUpdated,
  setDataInfoKey,
  handleTableUpdate,
  setEditItemId,
  editItemId
}) {
  const [rotulosData, setRotulosData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

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

    loadRotulosData()
  }, [tableUpdated])

  const openModalNow = () => {
    setOpenModal(true)
  }

  const openEditModalNow = id => {
    setOpenModalEdit(true)
    setEditItemId(id)
  }

  return (
    <>
      <div className="containerTableInfoRotulos">
        <div className="headerContainerTableRotulos">
          <p className="titleTableRotulos">Tabela de rótulos cadastrados:</p>
          <button className="BtnChangeTableRotulos">
            <TuneRoundedIcon />
          </button>
        </div>

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
