import { AnimatePresence } from 'framer-motion'
import React, { Fragment } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ResetPass from '../../components/login/resetPassword'
import Admin from '../../containers/Admin'
import Login from '../../containers/Login'
import WebPageFAQ from '../../containers/perguntasFrequentes(FAQ)'
import PageChangeLog from '../../containers/perguntasFrequentes(FAQ)/pageChangeLog'
import Register from '../../containers/register'
import { Private } from './private-route'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div className="AnimatedRoutes">
      <AnimatePresence>
        <Fragment>
          <Routes location={location} key={location.pathname}>
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<ResetPass />} path="/recuperarsenha" />
            <Route element={<Register />} path="/cadastro" />
            <Route element={<WebPageFAQ />} path="/perguntasfrequentes" />
            <Route element={<PageChangeLog />} path="/atualizacoespedea" />
            <Route element={<Private Admin={<Admin />} />} path="/admin" />
          </Routes>
        </Fragment>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes
