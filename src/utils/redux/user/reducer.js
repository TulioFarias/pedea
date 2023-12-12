import userActionTypes from './actionTypes'

const initalState = {
  userData: null
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.Login:
      console.log(action)
      return { ...state, userData: action.payload }

    case userActionTypes.Logout:
      return { ...state, userData: {} }
    default:
      return state
  }
}

export default userReducer
