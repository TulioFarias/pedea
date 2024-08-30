import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import userIcon from '../../../assets/icons/icon-user.png'

import api from '../../../services/api'
import { logout } from '../../../utils/redux/user/actions'

import '../../../sass/admin/HeaderAdmin/headerAdmin.scss'

function HeaderAdm({
  sidebarOpen,
  setSidebarOpen,
  handleOptionChange,
  setActiveButton
}) {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state.userInfoSlice.infoUser)
  const [user, setUser] = useState([])
  const { id: loggedInUserId } = userData

  useEffect(() => {
    async function loadUserData() {
      try {
        const { data } = await api.get('/admin')
        const loggedInUser = data.filter(user => user.id === loggedInUserId)

        if (loggedInUser) {
          setUser(loggedInUser)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [loggedInUserId])

  const voltar = () => {
    dispatch(logout())

    navigate('/login')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const SendToSettings = options => {
    handleOptionChange(options)
    setActiveButton(options)
  }

  return (
    <Container
      fluid
      className={`bodyHeader ${sidebarOpen ? 'bodyHeader-expanded' : ''}`}
    >
      <div className="containerDivLeft">
        <button className="OpenNavBarWithToogle" onClick={toggleSidebar}>
          <MenuOpenRoundedIcon />
        </button>

        <button className="btnLinkHeaderAdmin " onClick={() => window.open('https://www.ceara.gov.br/', '_blank')}>
          Portal do Governo
        </button>
        <button className="btnLinkHeaderAdmin " onClick={() => window.open('https://cearatransparente.ce.gov.br/', '_blank')}>
          Ceará Transparente
        </button>
        <button className="btnLinkHeaderAdmin " onClick={() => window.open('https://cearatransparente.ce.gov.br/portal-da-transparencia/ouvidoria?locale=pt-BR', '_blank')}>
          Ouvidoria
        </button>
        
        <button className="btnLinkHeaderAdmin " onClick={() => window.open('https://cearatransparente.ce.gov.br/portal-da-transparencia/acesso-a-informacao?locale=pt-BR', '_blank')}>
          Acesso a informação
        </button>
      </div>

     
        <div className="ContainerUserCustom">
          {user &&
            user.map(value => (
              <div className="containerUser" key={value.id}>
                <div className="containerImageHeaderAdmin">
                  <img
                    alt="userphoto"
                    className="custom-userPhoto"
                    src={value.path ? value.url : userIcon}
                    onClick={e => {
                      e.preventDefault()
                      SendToSettings('Configurações')
                    }}
                  />
                </div>

                <p className="user">
                  {t(`Seja bem vindo(a),`)} <br />
                  <p className="nameUser">{value.name}</p>
                </p>
              </div>
            ))}

          <button className="backButton" onClick={voltar}>
            <LogoutRoundedIcon />
          </button>
        </div>
      
    </Container>
  )
}

HeaderAdm.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  setActiveButton: PropTypes.func.isRequired
}

export default HeaderAdm
