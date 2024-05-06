import React, { useEffect, useState } from 'react'

import '../../../../sass/admin/Rotulos/rotulos.scss'
import { Table, Button } from 'react-bootstrap'

import api from '../../../../services/api'

function ContainerInfoRotulos() {
  const [rotulosData, setRotulosData] = useState([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    async function loadRotulosData() {
      try {
        const { data } = await api.get('/getAllRotulos')

        console.log(data)

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
                <td>
                  <Button variant="info" onClick={openModalNow}>
                    Editar
                  </Button>
                  <Button variant="danger">Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ContainerInfoRotulos
