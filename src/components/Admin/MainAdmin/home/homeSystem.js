import React from 'react'
import '../../../../sass/admin/HomeAdmin/homeAdmin.scss'

function HomeSystem() {
  return (
    <>
      <div className="ContainerHomeAdmin">
        <div className="ContainerTitleHome">
          <h2 className="titleHomeAdmin">
            {' '}
            Sistema de administração da Plataforma Estadual de Dados Espaciais
            Ambientais do Ceará.
          </h2>
        </div>

        <div className="ContainerAllInfoHomeSystem">
          <div className="ContainerTxtHomeAdmin">
            <p></p>
            <p></p>
            <p></p>
          </div>

          <div className="ContainerUpdateSystemHome">
            <h4>Atualizações:</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeSystem
