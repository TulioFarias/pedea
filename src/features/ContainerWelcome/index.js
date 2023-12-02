import React from 'react'

import MapPedea from '../../_config/Map/index.js'
import Footer from '../Footer/index.js'
import Header from '../Header/index.js'

function ContainerHome() {
  return (
    <div className="Container-Home">
      <Header />
      <MapPedea />
      <Footer />
    </div>
  )
}

export default ContainerHome
