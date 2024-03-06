import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Search from '../../../assets/icons/search.png'
import api from '../../../services/api'
import { logout } from '../../../utils/redux/user/actions'

import '../../../sass/admin/headerAdmin.scss'

function HeaderAdm() {
  const { t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    <div className="container-fluid bodyHeader">
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
        <button>
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
                    src={value.url}
                  />
                </div>

                <p className="user">
                  {t(`Seja bem vindo(a),`)} <br />
                  <p className="nameUser">{value.name}</p>
                </p>
              </div>
            ))}

          <a className=" backButton" onClick={voltar}>
            Sair
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdm
