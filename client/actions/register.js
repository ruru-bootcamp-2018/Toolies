import request from 'superagent'
import customRequest from '../utils/api'
import {saveUserToken} from '../utils/auth'
import {receiveLogin, setUser} from './login'

function requestRegister() {
  return ({
    type: 'REGISTER_REQUEST',
  })
}

function registerError(message) {
  return ({
    type: 'REGISTER_FAILURE',
    message
  })
}

export function registerUserRequest (creds) {
  return (dispatch) => {
    dispatch(requestRegister())
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
        dispatch(registerError(err.response.body.message))
      })
  }
}
