import request from '../utils/api'
import { saveUserToken } from '../utils/auth'

function requestLogin() {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin(user) {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

export function loginError(message) {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function requestUser() {
  return {
    type: 'USER_REQUEST'
  }
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  }
}

export function loginUser(creds) {
  return dispatch => {
    dispatch(requestLogin())
    return request('post', 'auth/login', creds)
      .then((response) => {
        const userInfo = saveUserToken(response.body.token)
        dispatch(receiveLogin(userInfo))
        dispatch(requestUser())
        dispatch(fetchUser(() => {document.location = '/#/profile'}))
      })
  }
}

export function fetchUser(callback) {
  return dispatch => {
    dispatch(requestUser())
    return request('get', 'user/fullProfile')
      .then((res) => {
        const fullUser = res.body
        dispatch(setUser(fullUser))
        callback()
      })
      .catch(err => {
        dispatch(loginError(err.response.body.message))
      })
  }
}