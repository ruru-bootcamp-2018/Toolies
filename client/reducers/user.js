const initialState = {
  gear: [],
  messages: {},
  isFetching: false,
  isSaving: false
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
        messages: action.user.messages,
        isFetching: false
      }
    case 'REQUEST_GEAR_SAVE':
      return {
        ...state,
        isSaving: true
      }
    case 'GEAR_ADD':
      let newGearArr = [...state.gear, action.item]
      return {
        ...state,
        gear: newGearArr,
        isSaving: false
      }
    case 'GEAR_ERROR':
      return {
        ...state,
        errorMessage: action.message,
        isSaving: false
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
    case 'REQUEST_MESSAGE_SAVE':
      return {
        ...state, 
        isSaving: true
      }
    case 'SET_REQUEST':
      let newMessages = {
        ...state.messages, 
        sent: [state.messages.sent, action.request]
        }
      return {
        ...state, 
        isSaving: false,
        messages: newMessages
      }
    case 'REQUEST_ERROR':
      return {
        ...state,
        errorMessage: action.message,
        isSaving: false
      }
    default:
      return state
  }
}