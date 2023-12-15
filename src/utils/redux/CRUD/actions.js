import { createSlice } from '@reduxjs/toolkit'

const persistedInfoList = JSON.parse(localStorage.getItem('infoList')) || []

const initialState = {
  info: persistedInfoList
}

const cardInfo = createSlice({
  name: 'info',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info.push(action.payload)
      localStorage.setItem('infoList', JSON.stringify(state.info))
      console.log(state)
    },
    removeInfo: (state, action) => {
      const updatedInfo = state.info.slice()
      const index = updatedInfo.findIndex(
        item => item.id === action.payload.ids
      )
      if (index !== -1) updatedInfo.splice(index, 1)
      return {
        ...state,
        info: updatedInfo
      }
    }
  }
})
export const { addInfo, removeInfo } = cardInfo.actions
export default cardInfo.reducer
