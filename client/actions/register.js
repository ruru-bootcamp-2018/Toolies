import request from 'superagent'
import customRequest from '../utils/api'
import {saveUserToken} from '../utils/auth'
import {receiveLogin, loginError, setUser} from './login'

export function registerUserRequest (creds) {
  return (dispatch) => {
    request
      .post('/api/auth/register')
      .send(creds)
      .then(res => {
        const userInfo = saveUserToken(res.body.token)
        dispatch(receiveLogin(userInfo))
        return customRequest('get', `user/fullProfile`)
          .then((res) => {
            const fullUser = res.body
            dispatch(setUser(fullUser))
          })
          .then(() => {
            document.location = "/#/profile"
          })
      })
      .catch(err => {
        dispatch(loginError(err.response.body.message))
      })
  }
}
