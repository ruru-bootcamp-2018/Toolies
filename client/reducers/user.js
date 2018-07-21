const initialState = {
  gear: []
}
  
  export default function user (state = initialState, action) {
    switch (action.type) {
      case 'SET_USER':
        return {
          id: action.user.id,
          firstName: action.user.first_name,
          lastName: action.user.last_name,
          username: action.user.user_name,
          email: action.user.email_address,
          gear: action.user.gear
        }
      case 'GEAR_ADD':
        let newGearArr = [...state.gear, action.item]
        return {
          ...state,
          gear: newGearArr
        }
      case 'GEAR_ERROR':
        return {
            ...state,
            message: action.message
        }
      default:
        return state
    }
  }