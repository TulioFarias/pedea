import React, { useRef } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
// import NavButtonsLeft from '../../components/NavButtonsLeft'
import MapPedea from '../Map'
function Home() {
  const mapTargetElement = useRef(null)
  return (
    <div>
      <Header />
      <div className="Container-map">
        <MapPedea mapTargetElement={mapTargetElement} />
      </div>
      <Footer />
    </div>
  )
}

export default Home
