const initialState = {
  gear: [],
  isFetching: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'SET_USER':
      return {
        ...state,
        id: action.user.id,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        username: action.user.user_name,
        email: action.user.email_address,
        gear: action.user.gear,
        isFetching: false
      }
    case 'REQUEST_GEAR_SAVE':
      return {
        ...state,
        isFetching: true
      }
    case 'GEAR_ADD':
      let newGearArr = [...state.gear, action.item]
      return {
        ...state,
        gear: newGearArr,
        isFetching: false
      }
    case 'GEAR_ERROR':
      return {
        ...state,
        message: action.message,
        isFetching: false
      }
    case 'EDIT_REQUEST':
      return {
        ...state,
        isFetching: action.isFetching,
        isSaving: action.isSaving
      }
    case 'EDIT_GEAR':
      let editedGearArr = state.gear.filter(item => item.id != action.item.id)
      editedGearArr.push(action.item)
      return {
        ...state,
        gear: editedGearArr,
        isFetching: false,
        isSaving: false
      }
    default:
      return state
  }
}