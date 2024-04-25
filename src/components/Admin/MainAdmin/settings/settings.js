import React from 'react'

import '../../../../sass/admin/Settings/settings.scss'
import SettingsSystemAndUser from './settingsSystem'
function SettingsAdmin() {
  return (
    <>
      <div className="containerWrapperOptions">
        <h2 className="titleSettings">Configurações</h2>
        <SettingsSystemAndUser />
      </div>
    </>
  )
}

export default SettingsAdmin
