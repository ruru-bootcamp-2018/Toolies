import request from '../utils/api'

function requestProfileEdit() {
    return {
        type: 'REQUEST_PROFILE_EDIT'
    }
}

function succesfulProfileEdit(update) {
    return {
        type: 'SUCCESS_PROFILE_EDIT',
        update
    }
}

function errorProfileEdit(message) {
    return {
        type: 'ERROR_PROFILE_EDIT',
        message
    }
}

export function editProfileAction(profileUpdate) {
    return dispatch => {
        dispatch(requestProfileEdit())
        return request('put', 'user/update', profileUpdate)
            .then((res) => {
                dispatch(succesfulProfileEdit(profileUpdate))
            })
            .catch(err => {
                dispatch(errorProfileEdit(err.message))
            })
    }
}