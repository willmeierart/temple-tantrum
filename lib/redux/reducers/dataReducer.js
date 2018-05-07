import { SET_SPONSORS } from '../actions/types'

const initialState = {
  sponsors: []
}

export default function envReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }

  switch (action.type) {
    case SET_SPONSORS: {
      return defaultAction('sponsors')
    }
    default:
      return state
  }
}
