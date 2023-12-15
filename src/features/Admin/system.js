import '../../sass/admin/admin.scss'

import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import edit from '../../assets/icons/edit.png'
import trash from '../../assets/icons/lixeira.png'
import { removeInfo } from '../../utils/redux/CRUD/actions'
import { ModalAdd } from './Addmodal'
function AdminSystem() {
  const infoList = useSelector(state => state.infoReducer.info)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('infoList', JSON.stringify(infoList))
  }, [infoList])

  const Remove = () => {
    dispatch(removeInfo(infoList))
  }
  return (
    <>
      <div className="containerAdmin">
        <div className="containerWrapper">
          <ModalAdd />
          <div>
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
                  <tr key={info.id}>
                    <td>{info.ids}</td>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.observation}</td>
                    <td>
                      <div className="btnEdited">
                        <button className="btns">
                          <img src={edit} />
                        </button>

                        <button className="btns" onClick={Remove}>
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
    </>
  )
}

export default AdminSystem
