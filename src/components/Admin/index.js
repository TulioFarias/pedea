import React, { useState } from 'react'

import Geoserver from './geoserver'
import HeaderAdmin from './headerAdmin'
import NavAdmin from './NavAdmin/NavAdmin'
import SettingsAdmin from './settings'
import AdminSystem from './system'
import '../../sass/admin/admin.scss'

function Admin() {
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

export default Admin
