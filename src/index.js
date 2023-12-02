import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css'
import './_translate/i18n'
import ContainerHome from './features/ContainerWelcome'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <ContainerHome />
  </>
)
