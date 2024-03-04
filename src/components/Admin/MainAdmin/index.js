import React, { useState } from 'react'

import HeaderAdmin from '../HeaderAdmin/headerAdmin'
import SettingsAdmin from '../MainAdmin//settings/settings'
import Geoserver from '../MainAdmin/geoserver'
import AdminSystem from '../MainAdmin/system'
import NavAdmin from '../NavAdmin/NavAdmin'
import '../../../sass/admin/admin.scss'

function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')

  const handleOptionChange = async option => {
    await setSelectedOption(option)
  }

  return (
    <>
      <HeaderAdmin />
      <NavAdmin handleOptionChange={handleOptionChange} />
      <div className="container-fluid ContainerMainSystem">
        {selectedOption === 'Home' && <AdminSystem />}
        {selectedOption === 'Geoserver' && <Geoserver />}
        {selectedOption === 'Configurações' && <SettingsAdmin />}
      </div>
    </>
  )
}

export default MainAdmin
