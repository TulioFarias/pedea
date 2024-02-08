import React, { useState } from 'react'

import HeaderAdmin from './HeaderAdmin/headerAdmin'
import NavAdmin from './NavAdmin/NavAdmin'
import Geoserver from './NavOptions/geoserver'
import SettingsAdmin from './NavOptions/settings'
import AdminSystem from './NavOptions/system'
import '../../sass/admin/admin.scss'

function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')

  const handleOptionChange = async option => {
    await setSelectedOption(option)
  }

  return (
    <div className="ContainerAllAdmin">
      <NavAdmin handleOptionChange={handleOptionChange} />
      <HeaderAdmin />
      {selectedOption === 'Home' && <AdminSystem />}
      {selectedOption === 'Geoserver' && <Geoserver />}
      {selectedOption === 'Configurações' && <SettingsAdmin />}
    </div>
  )
}

export default MainAdmin
