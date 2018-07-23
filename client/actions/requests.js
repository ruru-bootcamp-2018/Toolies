import request from '../utils/api'

export function postRequest(request) {
    return dispatch => {
        dispatch(requestMessageSave())
        return request('post', 'request/new', request)
            .then((res) => {
                dispatch(setRequest(request))
            })
            .catch(err => {
                dispatch(requestError(err.message))
            })
    }
}

export function requestMessageSave() {
    return {
        type: 'REQUEST_MESSAGE_SAVE'
    }
}

export function setRequest(request) {
    return {
        type: 'SET_REQUEST',
        request
    }
}


export function requestError (message) {
    return {
      type: 'REQUEST_ERROR',
      isFetching: false,
      isSaving: false,
      message
    }
  }