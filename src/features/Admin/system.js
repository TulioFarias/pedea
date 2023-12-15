import React from 'react'

import '../../sass/admin/admin.scss'
import { Table, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import { ModalAdd } from './Addmodal'
function AdminSystem() {
  const infoList = useSelector(state => state.infoReducer.info)
  console.log(infoList)
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
                    <td>{info.id}</td>
                    <td>{info.name}</td>
                    <td>{info.email}</td>
                    <td>{info.observation}</td>
                    <td>
                      <Button variant="info" size="sm" className="mr-2">
                        Editar
                      </Button>
                      <Button variant="danger" size="sm">
                        Excluir
                      </Button>
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
