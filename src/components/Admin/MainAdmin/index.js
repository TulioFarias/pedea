import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import FooterAdmin from '../FooterAdmin'
import HeaderAdmin from '../HeaderAdmin/headerAdmin'
import NavAdmin from '../NavAdmin/NavAdmin'
import FAQ from './FAQ'
import HomeAdmin from './home'
import Rotulos from './Rotulos/index'
import SettingsAdmin from './settings/settings'
import '../../../sass/admin/admin.scss'
import DataExplorer from './DataExplorer'



function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')
  const [activeButton, setActiveButton] = useState('Home')
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const handleOptionChange = async option => {
    await setSelectedOption(option)
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
        handleOptionChange={handleOptionChange}
        setActiveButton={setActiveButton}
      />
      <NavAdmin
        handleOptionChange={handleOptionChange}
        sidebarOpen={sidebarOpen}
        setActiveButton={setActiveButton}
        activeButton={activeButton}
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
          {selectedOption === 'Home' && <HomeAdmin   setActiveButton={setActiveButton}
        handleOptionChange={handleOptionChange}/>}
          {selectedOption === 'FAQ' && <FAQ />}
          {selectedOption === 'DataExplorer' && <DataExplorer />}
          {selectedOption === 'Rotulos Bilingue' && <Rotulos />}
          {selectedOption === 'Configurações' && <SettingsAdmin />}
        </motion.div>
      </Container>
      <FooterAdmin />
    </motion.div>
  )
}

export default MainAdmin
