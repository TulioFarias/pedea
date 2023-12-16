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
    },

    removeInfo: (state, action) => {
      const id = action.payload
      if (!id) return state

      const updatedInfoList = state.info.filter(info => info.id !== id)
      localStorage.setItem('infoList', JSON.stringify(updatedInfoList))

      return {
        ...state,
        info: updatedInfoList
      }
    },
    updateInfo: (state, action) => {
      const { id, name, email, observation } = action.payload

      const existingInfo = state.info.find(item => item.id === id)

      if (existingInfo) {
        existingInfo.name = name !== undefined ? name : existingInfo.name
        existingInfo.email = email !== undefined ? email : existingInfo.email
        existingInfo.observation =
          observation !== undefined ? observation : existingInfo.observation

        localStorage.setItem('infoList', JSON.stringify(state.info))
      }
    }
  }
})
export const { addInfo, removeInfo, updateInfo } = cardInfo.actions
export default cardInfo.reducer
