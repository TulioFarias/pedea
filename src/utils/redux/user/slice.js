import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const cartSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    SingIn: (state, action) => {
      return { ...state, userData: action.payload }
    }
  }
})
