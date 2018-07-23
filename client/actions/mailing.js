import request from '../utils/api'

function requestMailOut() {
    return {
        type: 'REQUEST_MAILOUT'
    }
}

function sentMail(gear_id) {
    return {
        type: 'MAILOUT_SUCCESS',
        gear_id
    }
}

function mailingError(message) {
    return {
        type: 'MAILOUT_ERROR',
        message
    }
}

export function sendRequest(gearId) {
    return dispatch => {
        dispatch(requestMailOut())
        request('post', 'mail/request', {gearId})
            .then(() => {
                dispatch(sentMail(gearId))
            })
            .catch(err => {
                dispatch(mailingError(err.response.body.message))
            })
    }
}