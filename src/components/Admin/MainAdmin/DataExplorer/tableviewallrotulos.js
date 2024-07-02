import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import apiPEDEA from '../../../../services/api'

function TableViewRotulosData() {
  const [dataExplorer, setDataExplorer] = useState([])

  useEffect(() => {
    async function getInfoDataExplorer() {
      try {
        const { data } = await apiPEDEA.get('/infoDataExplorer')
        const sortedData = data.sort((a, b) => a.id - b.id)
        setDataExplorer(sortedData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    getInfoDataExplorer()
  }, [])

  return (
    <div className="ContainerTableRotulosData">
      <div className="TableViewRotulos">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Categoria de Informação</th>
              <th>Classe Maior</th>
              <th>Subclasse Maior</th>
              <th>Classe Menor</th>
              <th>Nomenclatura PEDEA</th>
              <th>Fonte</th>
              <th>Coluna Atributo</th>
            </tr>
          </thead>
          <tbody>
            {dataExplorer.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.categoria_de_informacao}</td>
                <td>{item.classe_maior}</td>
                <td>{item.sub_classe_maior}</td>
                <td>{item.classe_menor}</td>
                <td>{item.nomenclatura_pedea}</td>
                <td>{item.fonte}</td>
                <td>{item.coluna_atributo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TableViewRotulosData
