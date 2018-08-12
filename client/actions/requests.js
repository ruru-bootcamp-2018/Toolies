import request from '../utils/api'
import { mailRequest } from './mailing'

function postRequest(message, didSucceed) {
    return dispatch => {
        dispatch(requestMessageSave())
        return request('post', 'request/new', message)
            .then((res) => {
                didSucceed(res.body)
            })
            .catch(err => {
                dispatch(requestError(err.message))
                didSucceed(false)
            })
    }
}

function requestMessageSave() {
    return {
        type: 'REQUEST_MESSAGE_SAVE'
    }
}

function setRequest(request) {
    return {
        type: 'SET_REQUEST',
        request
    }
}


function requestError(message) {
    return {
        type: 'REQUEST_ERROR',
        isFetching: false,
        isSaving: false,
        message
    }
}

export function manageRequest(message) {
    // send email
    // THEN send to DB
    // then send to state
    return dispatch => {
        const chain = new Promise((resolve, reject) => {
            dispatch(mailRequest(message, succeeded => {
                succeeded ? resolve() : reject()
            }))
        })
        .then(() => {
            return new Promise((resolve, reject) => {
                dispatch(postRequest(message, details => {
                    details ? resolve(details) : reject()
                }))
            })
        })
        .then(details => {
            Object.assign(message, details)
            dispatch(setRequest(message))
        })
    }
}

// delete request actions

function requestMessageDelete() {
    return {
        type: 'REQUEST_MESSAGE_DELETE'
    }
}

function successMessageDelete(id) {
    return {
        type: 'SUCCESS_MESSAGE_DELETE',
        id
    }
}

function errorMessageDelete(message) {
    return {
        type: 'ERROR_MESSAGE_DELETE',
        message
    }
}

export function manageMessageDelete(id) {
    return dispatch => {
        dispatch(requestMessageDelete())
        request('delete', `request/delete/${id}`)
            .then(res => {
                dispatch(successMessageDelete(id))
            })
            .catch(err => {
                dispatch(errorMessageDelete(err.message))
            })
    }
}

// update request actions

function requestMessageUpdate() {
    return {
        type: 'REQUEST_MESSAGE_UPDATE'
    }
}

function successMessageUpdate(id, update) {
    return {
        type: 'SUCCESS_MESSAGE_UPDATE',
        id,
        update
    }
}

function errorMessageUpdate(message) {
    return {
        type: 'ERROR_MESSAGE_UPDATE',
        message
    }
}

export function manageMessageUpdate(id, update) {
    return dispatch => {
        dispatch(requestMessageUpdate())
        request('put', `request/update/${id}`)
            .send(update)
            .then(res => {
                dispatch(successMessageUpdate(id, update))
            })
            .catch(err => {
                dispatch(errorMessageUpdate(err.message))
            })
    }
}