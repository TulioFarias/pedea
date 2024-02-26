import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Search from '../../../assets/icons/search.png'
import { logoutUser } from '../../../utils/redux/user/actions'

import '../../../sass/admin/headerAdmin.scss'

function HeaderAdm() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(state => state.userReducer.userData)
  const userDataFromStorage = JSON.parse(
    localStorage.getItem('pedea-admin: user')
  )

  const { name, lastName } = userDataFromStorage.user

  useEffect(() => {
    if (!userData) {
      const userDataFromStorage = JSON.parse(
        localStorage.getItem('pedea-admin: user')
      )
    }
  }, [])

  const voltar = () => {
    dispatch(logoutUser())

    navigate('/login')
  }
  return (
    <div className="container-fluid bodyHeader">
      <div className="containerDivLeft">
        <button className="OpenNavBarWithToogle">
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
          <p alt="userphoto" className="custom-userPhoto">
            User Photo
          </p>
          <div className="containerUser">
            <p className="user">
              {t(`Seja bem vindo(a),`)} <br />
              {`${name} ${lastName}`}
            </p>
          </div>

          <a className=" backButton" onClick={voltar}>
            Sair
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdm
