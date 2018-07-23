import request from 'superagent'
import customRequest from '../utils/api'
import {saveUserToken} from '../utils/auth'
import {receiveLogin, setUser, requestUser, fetchUser, redirectToProfile} from './login'

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
        dispatch(requestUser())
        dispatch(fetchUser(redirectToProfile))
      })
      .catch(err => {
        dispatch(registerError(err.response.body.message))
      })
  }
}
