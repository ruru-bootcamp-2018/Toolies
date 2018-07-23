import {combineReducers} from 'redux'

import auth from './auth'
import user from './user'
import gear from './gear'

export default combineReducers({
  auth,
  user,
  gear
})
