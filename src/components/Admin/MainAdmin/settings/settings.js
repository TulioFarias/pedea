import React from 'react'

import '../../../../sass/admin/Settings/settings.scss'
import { useTranslation } from 'react-i18next'
import SettingsSystemAndUser from './settingsSystem'

function SettingsAdmin() {
  const { t } = useTranslation()
  return (
    <>
      <div className="containerWrapperOptions">
       
        <div className="ContainerAllSettingsInfo">
          <SettingsSystemAndUser />
     
        </div>
      </div>
    </>
  )
}

export default SettingsAdmin
