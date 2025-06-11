import axios from 'axios'

const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

const apiPEDEA = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:3001'
    : 'https://pedea.sema.ce.gov.br/gestorapi'
})

apiPEDEA.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('pedea-admin: user')
  const token = userData && JSON.parse(userData).token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiPEDEA
