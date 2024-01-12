import '../../sass/admin/admin.scss'

import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import trash from '../../assets/icons/lixeira.png'
import { removeInfo, updateInfo } from '../../utils/redux/CRUD/actions'
import { ModalAdd } from './AdminModal/Addmodal'
import { EditedModal } from './AdminModal/editModal'
import ConfirmDeleteModal from './deleteModal'

function AdminSystem() {
  const infoList = useSelector(state => state.infoReducer.info)
  const dispatch = useDispatch()
  const [selectedId, setSelectedId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('infoList', JSON.stringify(infoList))
  }, [infoList])

  const handleRemove = id => {
    setSelectedId(id)
    setShowDeleteModal(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  const handleEdit = id => {
    dispatch(updateInfo(id))
    setSelectedId(id)
  }

  return (
    <>
      <div className="containerAdmin">
        <div className="containerWrapper">
          <ModalAdd />

          <div className="table-responsive">
            <h2>Lista de Informações</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Observações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {infoList.map(info => (
                  <tr key={info.ids}>
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.observation}</td>
                    <td>
                      <div className="btnEdited">
                        <a className="btns" onClick={() => handleEdit(info.id)}>
                          <EditedModal editId={selectedId} />
                        </a>

                        <button
                          className="btns"
                          onClick={() => handleRemove(info.id)}
                        >
                          <img src={trash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        selectedId={selectedId}
      />
    </>
  )
}

export default AdminSystem
