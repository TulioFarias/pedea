import { combineReducers } from 'redux'

import infoReducer from './CRUD/actions'
import userInfoSlice from './user/actions'

const rootReducer = combineReducers({ userInfoSlice, infoReducer })

export default rootReducer
