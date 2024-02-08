import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
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
    localStorage.getItem('PEDEA-AdminSystem')
  )

  const userEmail =
    userData || userDataFromStorage
      ? userData?.auth?.email || userDataFromStorage?.email
      : ''

  useEffect(() => {
    if (!userData) {
      const userDataFromStorage = JSON.parse(
        localStorage.getItem('PEDEA-AdminSystem')
      )
      if (userDataFromStorage) {
        dispatch({ type: 'UPDATE_USER_DATA', payload: userDataFromStorage })
      }
    }
  }, [])

  const voltar = () => {
    dispatch(logoutUser())

    navigate('/login')
  }
  return (
    <div className="container-fluid bodyHeader">
      <button className="OpenNavBarWithToogle">
        <ChevronRightRoundedIcon />
      </button>
      <div className="containerDivLeft">
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

        <div className="d-flex justify-content-end align-items-center customDivRight">
          <div className="containerUser">
            <p className="user">
              {userEmail
                ? `${t('Seja bem vindo(a),')} ${userEmail}!`
                : `${t('Seja bem vindo(a).')}`}
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
