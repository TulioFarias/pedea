import userActionTypes from './actionTypes'

export const loginUser = payload => ({
  type: userActionTypes.Login,
  payload
})

export const logoutUser = () => ({
  type: userActionTypes.Logout
})
