import { AnimatePresence } from 'framer-motion'
import React, { Fragment } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ResetPass from '../../components/login/resetPassword'
import Admin from '../../containers/Admin'
import Home from '../../containers/Home'
import Login from '../../containers/Login'
import WebPageFAQ from '../../containers/perguntasFrequentes(FAQ)'
import Register from '../../containers/register'
import PageChangeLog from '../Admin/MainAdmin/FAQ/changeLOG/containerPageChangeLog/containerPageChangeLog'
import { Private } from './private-route'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div className="AnimatedRoutes">
      <AnimatePresence>
        <Fragment>
          <Routes location={location} key={location.pathname}>
            <Route element={<Home />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<ResetPass />} path="/resetpassword" />
            <Route element={<Register />} path="/register" />
            <Route element={<WebPageFAQ />} path="/perguntasfrequentes" />
            <Route element={<PageChangeLog />} path="/changelogpedea" />
            <Route element={<Private Admin={<Admin />} />} path="/admin" />
          </Routes>
        </Fragment>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes
