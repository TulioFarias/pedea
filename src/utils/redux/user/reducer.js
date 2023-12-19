import userActionTypes from './actionTypes'

const storedUserData = JSON.parse(localStorage.getItem('PEDEA-AdminSystem'))

const initalState = {
  userData: storedUserData || null
}

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case userActionTypes.CreateUser: {
      console.log(action.payload)

      return { ...state, userData: action.payload }
    }

    case userActionTypes.Login: {
      localStorage.setItem('PEDEA-AdminSystem', JSON.stringify(action.payload))
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
