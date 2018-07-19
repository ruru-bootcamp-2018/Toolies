import request from '../utils/api'
import { saveUserToken } from '../utils/auth'

function requestLogin () {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin (user) {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

export function loginError (message) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function setUser (user) {
  return {
    type: 'SET_USER',
    user
  }
}

export function loginUser (creds) {
  return dispatch => {
    dispatch(requestLogin(creds))
    return request('post', 'auth/login', creds)
      .then((response) => {
        const userInfo = saveUserToken(response.body.token)
        dispatch(receiveLogin(userInfo))
        return request('get', `user/${userInfo.user_name}`)
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
