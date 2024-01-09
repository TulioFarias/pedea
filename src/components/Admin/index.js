import React from 'react'

import HeaderAdmin from './headerAdmin'
import NavAdmin from './NavAdmin/NavAdmin'
import AdminSystem from './system'
import '../../sass/admin/admin.scss'

function Admin() {
  return (
    <div className="ContainerAllAdmin">
      <NavAdmin />
      <HeaderAdmin />
      <AdminSystem />
    </div>
  )
}

export default Admin
