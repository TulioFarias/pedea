import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css'
import './lib/i18n'
import Home from './containers/Home'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
