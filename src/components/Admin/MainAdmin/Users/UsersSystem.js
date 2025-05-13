import React from 'react'
import '../../../../sass/admin/HomeAdmin/homeAdmin.scss'

import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

function UserSystem({setActiveButton, handleOptionChange }) {

  const { t } = useTranslation()


  return (
    <>
      <div className="ContainerHomeAdmin">

        <div className='ContainerWelcome'>
          <h5 className='TitleWelcome'>{t("Bem-vindo(a) à Plataforma de Administrador da PEDEA!")}</h5>

          <p className='TxtWelcome'>{t("É um prazer tê-lo(a) conosco. Aqui você terá acesso a uma série de ferramentas para gerenciar e otimizar as funcionalidades de nossa plataforma. Para facilitar sua navegação, preparamos um tutorial completo, que o(a) guiará pelos principais módulos disponíveis. Vale ressaltar que alguns recursos são restritos apenas para usuários administradores, portanto, siga as instruções com atenção. Vamos começar!")}</p>



          <p className='TxtInicial'>
         {t("Na página inicial, você encontrará uma visão geral das funcionalidades disponíveis na plataforma. Este é o ponto de partida para acessar todos os módulos que você irá gerenciar. Através dela, você poderá navegar facilmente para cada seção utilizando o menu principal.")}
          </p>

        </div>

        


        <div className='ContainerFooterHome'>
          <p className='TxtFooterHome'>{t("Aproveite ao máximo a plataforma! Seguindo este tutorial, você estará preparado(a) para explorar todas as funcionalidades que a PEDEA tem a oferecer. Se precisar de ajuda, não hesite em consultar nossa equipe de suporte.")}</p>

          <p className='TxtFooterHome'>{t("Boas práticas e boa gestão! 🚀")}</p>
        </div>

      </div>
    </>
  )
}


UserSystem.propTypes = {
  setActiveButton: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
}

export default UserSystem
