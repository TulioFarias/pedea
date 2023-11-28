import React from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NavButtonsLeft from '../../components/NavButtonsLeft'
import OpenLayersMap from '../Map'
function Home() {
  return (
    <div>
      <Header />
      <div>
        <NavButtonsLeft />
      </div>
      <OpenLayersMap />
      <Footer />
    </div>
  )
}

export default Home
