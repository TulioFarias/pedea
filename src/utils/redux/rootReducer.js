import { combineReducers } from 'redux'

import infoReducer from './CRUD/actions'
import userReducer from './user/reducer'

const rootReducer = combineReducers({ userReducer, infoReducer })

export default rootReducer
