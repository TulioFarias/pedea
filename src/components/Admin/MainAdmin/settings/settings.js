import React from 'react'

import '../../../../sass/admin/Settings/settings.scss'

import SettingsSystemAndUser from './userSettings/settingsSystem'
function SettingsAdmin() {
  return (
    <>
      <div className="containerWrapperOptions">
        <h2 className="titleSettings">Configurações</h2>

        <div className="ContainerAllSettingsInfo">
          <SettingsSystemAndUser />
        </div>
      </div>
    </>
  )
}

export default SettingsAdmin
