import React from 'react'

import Footer from '../../components/Footer/index.js'
import Header from '../../components/Header/index.js'
import Welcome from '../../features/index.js'

function Home() {
  return (
    <div className="Container-Home">
      <Header />
      <Welcome />

      <Footer />
    </div>
  )
}

export default Home
