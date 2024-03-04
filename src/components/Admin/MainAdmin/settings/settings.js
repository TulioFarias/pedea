import React from 'react'

import '../../../../sass/admin/settings.scss'
import SettingsSystemAndUser from './settingsSystem'
function SettingsAdmin() {
  return (
    <>
      <div className="containerWrapperOptions">
        <h2>Configurações</h2>
        <SettingsSystemAndUser />
      </div>
    </>
  )
}

export default SettingsAdmin
