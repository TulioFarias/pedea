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
            <p>
              1. Este sistema foi desenvolvido para fornecer uma plataforma
              centralizada para acessar e gerenciar dados ambientais do estado
              do Ceará. Aqui você encontrará informações importantes sobre a
              qualidade do ar, recursos hídricos, biodiversidade e muito mais.
            </p>
            <p>
              2. Utilize as diversas funcionalidades disponíveis para analisar
              dados, gerar relatórios e tomar decisões informadas para promover
              a conservação e proteção do meio ambiente em nosso estado.
            </p>
            <p>
              3. Estamos comprometidos em fornecer uma experiência de usuário
              intuitiva e eficiente para garantir que você possa acessar
              facilmente as informações necessárias para suas atividades de
              pesquisa, planejamento e gestão ambiental.
            </p>
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
