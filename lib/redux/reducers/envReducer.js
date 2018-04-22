import { CHECK_IF_MOBILE, CHECK_IF_IE, CHECK_BROWSER, GET_VP_DIMS, LOCK_ORIENTATION } from '../actions/types'

const initialState = {
  isMobile: null,
  mobileSideways: null,
  isIE: null,
  browser: null,
  vpDims: {
    width: null,
    height: null
  },
  screenLocked: false
}

export default function envReducer (state = initialState, action) {
  const defaultAction = key => {
    const newState = { ...state }
    newState[key] = action.payload
    return newState
  }

  switch (action.type) {
    case CHECK_IF_MOBILE: {
      return defaultAction('isMobile')
    }
    case CHECK_IF_IE: {
      return defaultAction('isIE')
    }
    case CHECK_BROWSER: {
      return defaultAction('browser')
    }
    case GET_VP_DIMS: {
      const newDims = { ...state.dims }
      const { width, height } = action.payload
      let mobileSideways = false
      if (typeof window.orientation !== 'undefined' && window.orientation !== 0) {
        newDims.width = height
        newDims.height = width
        mobileSideways = true
      } else {
        newDims.width = width
        newDims.height = height
      }
      const newState = { ...state }
      newState.dims = newDims
      newState.mobileSideways = mobileSideways
      return newState
    }
    case LOCK_ORIENTATION: {
      return defaultAction('screenLocked')
    }
    default:
      return state
  }
}
