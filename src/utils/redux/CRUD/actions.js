import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: []
}

const cardInfo = createSlice({
  name: 'info',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info.push(action.payload)
      console.log(state)
    }
  }
})
export const { addInfo } = cardInfo.actions
export default cardInfo.reducer
