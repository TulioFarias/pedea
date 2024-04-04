import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import HeaderAdmin from '../HeaderAdmin/headerAdmin'
import NavAdmin from '../NavAdmin/NavAdmin'
import HomeAdmin from './home/HomeAdmin'
import Link1 from './Link1'
import Link2 from './Link2'
import Link3 from './Link3'
import Link4 from './Link4'
import Link5 from './Link5'
import Link6 from './Link6'
import Link7 from './Link7'
import SettingsAdmin from './settings/settings'

import '../../../sass/admin/admin.scss'

function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkTheme, setDarkTheme] = useState(false)

  const handleOptionChange = async option => {
    await setSelectedOption(option)
  }

  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{}}
    >
      <HeaderAdmin
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        toggleTheme={toggleTheme}
      />
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
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1.5 }}
          key={selectedOption || 'empty'}
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
        </motion.div>
      </Container>
    </motion.div>
  )
}

export default MainAdmin
