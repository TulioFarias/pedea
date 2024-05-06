import '../../../sass/admin/admin.scss'

import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import trash from '../../../assets/icons/lixeira.png'
import { updateInfo } from '../../../utils/redux/CRUD/actions'
import { ModalAdd } from '../AdminModal/Addmodal'
import { EditedModal } from '../AdminModal/editModal'
function Link1() {
  const { t } = useTranslation()
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

  const handleEdit = id => {
    dispatch(updateInfo(id))
    setSelectedId(id)
  }

  return (
    <>
      <div className="containerWrapperOptions">
        <div className="table-responsive">
          <h2>{t('Lista de Informações')}</h2>
          <ModalAdd />
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
                <tr key={info.userId}>
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
    </>
  )
}

export default Link1
