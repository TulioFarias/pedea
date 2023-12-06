import React from 'react'

import MapPedea from '../../_config/map.js'
import Footer from '../../features/Footer'
import Header from '../../features/Header'

function Home() {
  return (
    <div className="Container-Home">
      <Header />
      <MapPedea />
      <Footer />
    </div>
  )
}

export default Home
