import React, { useState } from 'react'

import HeaderAdmin from '../HeaderAdmin/headerAdmin'
import NavAdmin from '../NavAdmin/NavAdmin'
import HomeAdmin from './HomeAdmin'
import Link1 from './Link1'
import Link2 from './Link2'
import Link3 from './Link3'
import Link4 from './Link4'
import Link5 from './Link5'
import Link6 from './Link6'
import Link7 from './Link7'
import SettingsAdmin from './settings/settings'

import '../../../sass/admin/admin.scss'
import { Container } from 'react-bootstrap'

function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleOptionChange = async option => {
    await setSelectedOption(option)
  }

  return (
    <>
      <HeaderAdmin setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <NavAdmin
        handleOptionChange={handleOptionChange}
        sidebarOpen={sidebarOpen}
      />
      <Container
        fluid
        className={`ContainerMainSystem ${
          sidebarOpen ? 'ContainerMainSystem-expanded' : ''
        }`}
      >
        {selectedOption === 'Home' && <HomeAdmin />}
        {selectedOption === 'Link1' && <Link1 />}
        {selectedOption === 'Link2' && <Link2 />}
        {selectedOption === 'Link3' && <Link3 />}
        {selectedOption === 'Link4' && <Link4 />}
        {selectedOption === 'Link5' && <Link5 />}
        {selectedOption === 'Link6' && <Link6 />}
        {selectedOption === 'Link7' && <Link7 />}
        {selectedOption === 'Configurações' && <SettingsAdmin />}
      </Container>
    </>
  )
}

export default MainAdmin
