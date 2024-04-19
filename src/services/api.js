import axios from 'axios'

const apiPEDEA = axios.create({
  baseURL: 'http://localhost:3001'
})

apiPEDEA.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('pedea-admin: user')
  const token = userData && JSON.parse(userData).token

  config.headers.Authorization = `Bearer ${token}`

  console.log(config)

  return config
})

export default apiPEDEA
