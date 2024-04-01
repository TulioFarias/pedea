import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import userIcon from '../../../assets/icons/icon-user.png'
import Search from '../../../assets/icons/search.png'
import api from '../../../services/api'
import { logout } from '../../../utils/redux/user/actions'

import '../../../sass/admin/headerAdmin.scss'

function HeaderAdm({ sidebarOpen, setSidebarOpen, toggleTheme }) {
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

  return (
    <Container
      fluid
      className={`bodyHeader ${sidebarOpen ? 'bodyHeader-expanded' : ''}`}
    >
      <div className="containerDivLeft">
        <button className="OpenNavBarWithToogle" onClick={toggleSidebar}>
          {' '}
          <MenuOpenRoundedIcon />
        </button>
        <input
          type="text"
          placeholder={t('Procurar por...')}
          className="form-control inputSearch"
          aria-label="Procurar por..."
          aria-describedby="basic-addon2"
        />

        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary SearchButton"
            type="button"
          >
            <img src={Search} />
          </button>
        </div>
      </div>

      <div className="containerButtonsHeader">
        <button>
          <NotificationsNoneRoundedIcon />
        </button>

        <button onClick={toggleTheme}>
          <DarkModeOutlinedIcon />
        </button>

        <div className="customDivRight">
          {user &&
            user.map(value => (
              <div className="containerUser" key={value.id}>
                <div className="containerImageHeaderAdmin">
                  <img
                    alt="userphoto"
                    className="custom-userPhoto"
                    src={value.path ? value.url : userIcon}
                  />
                </div>

                <p className="user">
                  {t(`Seja bem vindo(a),`)} <br />
                  <p className="nameUser">{value.name}</p>
                </p>
              </div>
            ))}

          <a className=" backButton" onClick={voltar}>
            <LogoutRoundedIcon />
          </a>
        </div>
      </div>
    </Container>
  )
}

HeaderAdm.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.bool.isRequired
}

export default HeaderAdm
