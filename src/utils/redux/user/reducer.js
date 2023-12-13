import userActionTypes from './actionTypes'

const initalState = {
  userData: []
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.Login: {
      console.log(action)
      return { ...state, userData: action.payload }
    }

    case userActionTypes.Logout:
      return { ...state, userData: null }

    default:
      return state
  }
}

export default userReducer
