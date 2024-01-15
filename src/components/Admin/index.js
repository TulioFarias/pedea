import React, { useState } from 'react'

import HeaderAdmin from './headerAdmin'
import NavAdmin from './NavAdmin/NavAdmin'
import AdminSystem from './system'
import '../../sass/admin/admin.scss'
import Geoserver from './geoserver'

function Admin() {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = option => {
    setSelectedOption(option)
  }

  console.log(selectedOption)

  return (
    <div className="ContainerAllAdmin">
      <NavAdmin handleOptionChange={handleOptionChange} />
      <HeaderAdmin />
      <AdminSystem />
    </div>
  )
}

export default Admin
