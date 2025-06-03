import { Tooltip } from '@mui/material'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import Flag from 'react-flagkit'
import { useTranslation } from 'react-i18next'
import { Button } from 'primereact/button'
import '../../../sass/admin/NavAdmin/navAdmin.scss'

import ButtonSystem from './NavButtonsSystem'

function NavAdmin({
  handleOptionChange,
  sidebarOpen,
  setSidebarOpen,
  setActiveButton,
  activeButton
}) {
  const { t, i18n } = useTranslation()
  const handleLanguageChange = value => {
    i18n.changeLanguage(value)
  }


  return (
    <Container
      fluid
      className={`bodyNav ${sidebarOpen ? 'bodyNav-expanded' : ''}`}
    >
      <div className="containerDivsLanguage">
        <Tooltip title="PT" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('pt-BR')}
          >
            <Flag country="BR" />
          </button>
        </Tooltip>

        <Tooltip title="EN" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('en')}
          >
            <Flag country="US" />
          </button>
        </Tooltip>

        <Tooltip title="ES" placement="bottom">
          <button
            className="my-btns-linguage"
            onClick={() => handleLanguageChange('es')}
          >
            <Flag country="ES" />
          </button>
        </Tooltip>
      </div>

      

      <hr className="hrNavOptionsOne" />
      <ButtonSystem
        handleOptionChange={handleOptionChange}
        setActiveButton={setActiveButton}
        activeButton={activeButton}
      />
    </Container>
  )
}

NavAdmin.propTypes = {
  setSidebarOpen: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  setActiveButton: PropTypes.func.isRequired,
  activeButton: PropTypes.string.isRequired
}

export default NavAdmin
