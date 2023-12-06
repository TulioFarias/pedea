import React from 'react'
import ReactDOM from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.css'
import './_translate/i18n'

import NewRoutes from './_config/routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <NewRoutes />
  </>
)
