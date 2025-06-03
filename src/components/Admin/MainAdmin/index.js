import { motion } from 'framer-motion'
import  { useState } from 'react'
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
import Users from './Users'
import Geoserver from './Geoserver'
import { Button } from 'primereact/button'




function MainAdmin() {
  const [selectedOption, setSelectedOption] = useState('Home')
  const [activeButton, setActiveButton] = useState('Home')
  const [sidebarOpen, setSidebarOpen] = useState(false)


  const handleOptionChange = async option => {
    await setSelectedOption(option)
  }

    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{}}
    >
      <HeaderAdmin
        handleOptionChange={handleOptionChange}
        setActiveButton={setActiveButton}
      />

      
      <NavAdmin
        handleOptionChange={handleOptionChange}
        setSidebarOpen={setSidebarOpen}
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
        <Button 
          className="ButtonSideBar" 
          icon={sidebarOpen ? 'pi pi-chevron-right' : 'pi pi-chevron-left'} 
          aria-label="Alternar menu"
          onClick={toggleSidebar}
        />
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
          {selectedOption === 'Geoserver' && <Geoserver />}
          {selectedOption === 'Usuarios' && <Users />}
          {selectedOption === 'Configurações' && <SettingsAdmin />}
        </motion.div>
      </Container>
      <FooterAdmin />
    </motion.div>
  )
}

export default MainAdmin
