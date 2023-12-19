import React from 'react'

import { HeaderAdmin } from './headerAdmin'
import { NavAdmin } from './NavAdmin'
import AdminSystem from './system'

function Admin() {
  return (
    <>
      <NavAdmin />
      <HeaderAdmin />
      <AdminSystem />
    </>
  )
}

export default Admin
