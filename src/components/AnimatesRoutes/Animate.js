import { AnimatePresence } from 'framer-motion'
import React, { Fragment } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import ResetPass from '../../components/login/resetPassword'
import Admin from '../../containers/Admin'
import Home from '../../containers/Home'
import Login from '../../containers/Login'
import Register from '../../containers/register'
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
            {/* <Route
              element={<PrivateRecoverPass Admin={<ResetPass />} />}
              path="/resetPass"
            /> */}
            <Route element={<ResetPass />} path="/resetpassword" />
            <Route element={<Register />} path="/register" />
            <Route element={<Private Admin={<Admin />} />} path="/admin" />
            <Route element={<Private Admin={<Admin />} />} path="/admin" />
          </Routes>
        </Fragment>
      </AnimatePresence>
    </div>
  )
}

export default AnimatedRoutes
