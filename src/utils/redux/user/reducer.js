import userActionTypes from './actionTypes'

const storedUserData = JSON.parse(localStorage.getItem('pedea-admin: user'))

const initalState = {
  userData: storedUserData || null
}

const userReducer = async (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.CreateUser: {
      return { ...state, userData: action.payload }
    }

    case userActionTypes.Login: {
      localStorage.setItem('pedea-admin: user', JSON.stringify(action.payload))
      const newState = { ...state, userData: action.payload }

      return newState
    }

    case userActionTypes.Logout:
      localStorage.removeItem('pedea-admin: user')
      return { ...state, userData: null }

    default:
      return state
  }
}

export default userReducer
