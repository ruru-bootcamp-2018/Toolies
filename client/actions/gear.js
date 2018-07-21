import request from '../utils/api'

export function getGear() {
  return dispatch => {
    dispatch(requestGear())
    return request('get', 'gear/all')
      .then((res) => {
        let gear = res.body
        dispatch(setGear(gear))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(gearError(err.message))
        // not sure catch block works
      })
  }
}

  export function requestGear () {
    return {
      type: 'GEAR_REQUEST',
      isFetching: true,
      isSaving: false
    }
  }

  export function setGear (gear) {
    return {
      type: 'SET_GEAR',
      gear:gear,
      isFetching: false,
      isSaving: false
    }
  }

  export function gearError (message) {
    return {
      type: 'GEAR_ERROR',
      isFetching: false,
      isSaving: false,
      message
    }
  }

  export function requestGearSave () {
    return {
      type: 'REQUEST_GEAR_SAVE',
      isFetching: false,
      isSaving: true
    }
  }

  export function gearAdd (item) {
    return {
      type: 'GEAR_ADD',
      item
    }
  }

  export function addGearItem(item) {
    // untested
    return dispatch => {
      console.log('about to request api/gear/new')
      dispatch(requestGearSave())
      return request('post', 'gear/new', item)
        .then((res) => {
          let newGear = res.body
          dispatch(gearAdd(newGear))
        })
        .catch(err => {
          console.log(err.response)
          dispatch(gearError(err.message))
          // not sure catch block works
        })
    }
  }