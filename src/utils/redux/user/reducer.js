import userActionTypes from './actionTypes'

const initalState = {
  userData: null
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.Login: {
      const { auth } = action.payload
      localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(auth))
      console.log(state)
      return { ...state, userData: action.payload }
    }

    case userActionTypes.Logout:
      localStorage.removeItem('PEDEA-AdminSystem')
      return { ...state, userData: null }

    default:
      return state
  }
}

export default userReducer
