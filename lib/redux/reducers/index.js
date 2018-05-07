import { combineReducers } from 'redux'
import envReducer from './envReducer'
import dataReducer from './dataReducer'

const rootReducer = combineReducers({
  env: envReducer,
  cachedData: dataReducer
})

export default rootReducer
