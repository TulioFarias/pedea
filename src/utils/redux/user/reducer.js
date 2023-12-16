import userActionTypes from './actionTypes'

const storedUserData = JSON.parse(localStorage.getItem('PEDEA-AdminSystem'))

const initalState = {
  userData: storedUserData || null
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.Login: {
      const { auth } = action.payload
      localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(auth))
      const newState = { ...state, userData: action.payload }

      return newState
    }

    case userActionTypes.Logout:
      localStorage.removeItem('PEDEA-AdminSystem')
      return { ...state, userData: null }

    default:
      return state
  }
}

export default userReducer
