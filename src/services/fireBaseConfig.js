import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCIanJNhT26ISsLitxIhW1MGviSM-RU4nY',
  authDomain: 'pedea-89d5b.firebaseapp.com',
  projectId: 'pedea-89d5b',
  storageBucket: 'pedea-89d5b.appspot.com',
  messagingSenderId: '717598242109',
  appId: '1:717598242109:web:b904830507a21c025fc154',
  measurementId: 'G-6RX9DHL8C0'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
getAnalytics(app)

export const loginAndRetrieveToken = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return userCredential
  } catch (error) {
    console.error('Erro de autenticação')
  }
}

export const createRegister = async (email, password) => {
  try {
    const CreateUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return CreateUser
  } catch (error) {
    console.error('Erro durante a criação do usuário', error)
  }
}
