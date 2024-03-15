import { createSlice } from '@reduxjs/toolkit'
const storedUserData = JSON.parse(localStorage.getItem('pedea-admin: user'))

const initialState = {
  infoUser: storedUserData
}

const userInfoSlice = createSlice({
  name: 'infoUser',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.infoUser = action.payload
      localStorage.setItem('pedea-admin: user', JSON.stringify(action.payload))
    },
    login: (state, action) => {
      state.infoUser = action.payload
      localStorage.setItem('pedea-admin: user', JSON.stringify(action.payload))
    },
    logout: state => {
      state.infoUser = null

      if (!state.infoUser) {
        localStorage.removeItem('pedea-admin: user')
      }
    }
  }
})

export const { createUser, login, logout } = userInfoSlice.actions

export default userInfoSlice.reducer
