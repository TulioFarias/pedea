import React from 'react'

import '../../../../sass/admin/Settings/settings.scss'

import SettingsSystemAndUser from './settingsSystem'
import LogoutComponent from './settingsLogout'
function SettingsAdmin() {
  return (
    <>
      <div className="containerWrapperOptions">
        <h2 className="titleSettings">Configurações</h2>

        <div className="ContainerAllSettingsInfo">
          <SettingsSystemAndUser />
          <LogoutComponent/>
        </div>
      </div>
    </>
  )
}

export default SettingsAdmin
