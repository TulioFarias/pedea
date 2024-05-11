import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import React, { useEffect, useState } from 'react'
import '../../../../sass/admin/Rotulos/rotulos.scss'
import { Table, Button } from 'react-bootstrap'

import api from '../../../../services/api'
import ModalConfirmDelete from './modalsRotulos/modalDelete'
import EditModalRotulos from './modalsRotulos/modalEdit'

function ContainerInfoRotulos() {
  const [rotulosData, setRotulosData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getAllRotulos')

        setRotulosData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadRotulosData()
  }, [])

  const openModalNow = () => {
    setOpenModal(true)
  }

  const openEditModalNow = () => {
    setOpenModalEdit(true)
  }
  return (
    <>
      <div className="containerTableInfoRotulos">
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
                  <Button variant="secondary" onClick={openEditModalNow}>
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

        <ModalConfirmDelete openModal={openModal} setOpenModal={setOpenModal} />
        <EditModalRotulos
          openModalEdit={openModalEdit}
          setOpenModalEdit={setOpenModalEdit}
        />
      </div>
    </>
  )
}

export default ContainerInfoRotulos
