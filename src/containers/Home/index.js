import React, { useRef } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import MapPedea from '../Map'
function Home() {
  const mapTargetElement = useRef(null)
  return (
    <div>
      <Header />
      <MapPedea mapTargetElement={mapTargetElement} />
      <Footer />
    </div>
  )
}

export default Home
