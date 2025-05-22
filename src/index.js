import 'bootstrap/dist/css/bootstrap.css'
import './_translate/i18n'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-green/theme.css';

import NewRoutes from './_config/routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <NewRoutes />
    <ToastContainer position="top-right" autoClose={2500} />
  </>
)
