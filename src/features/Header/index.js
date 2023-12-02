import React from 'react'

import GovHeader from './GovHeader'
import HeaderActions from './Header'

const Header = () => {
  return (
    <div className="Container-Header">
      <GovHeader />
      <HeaderActions />
    </div>
  )
}

export default Header
