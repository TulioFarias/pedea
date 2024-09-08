import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../sass/login/splash.scss';
import apiPEDEA from '../../services/api';
import { useSelector } from 'react-redux';
import logoPEDEA from '../../assets/img/pedea-logo.png';

import { dotSpinner } from 'ldrs'
function SplashScreen() {
  const [user, setUser] = useState(null);
  const userData = useSelector(state => state.userInfoSlice.infoUser);
  const { id: loggedInUserId } = userData;

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await apiPEDEA.get('/admin');
        const loggedInUser = data.find(user => user.id === loggedInUserId);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    }

    getUser();
  }, [loggedInUserId]);


  dotSpinner.register()

  return (
    <div className="splash-screen-container">
      <motion.img
        src={logoPEDEA}
        alt="Logo PEDEA"
        className="logo"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {user ? `Seja bem-vindo(a), ${user.name}!` : 'Carregando...'}
        </motion.h1>
      </motion.div>


      <l-dot-spinner
        size="50"
        speed="0.9"
        color="white"
      ></l-dot-spinner>
    </div>
  );
}

export default SplashScreen;




