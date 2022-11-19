import { combineArray } from '../../utils/populateOptions'
import { ActionTypes } from '../constants/action-types'

const initialState = {
  schoolClasses: []
}
export const MasterData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SCHOOL_CLASS:
      return { ...state }
    case ActionTypes.GET_SCHOOL_CLASS_SUCCESS:
      return { ...state, schoolClasses: combineArray(payload) }
    case ActionTypes.GET_SCHOOL_CLASS_ERROR:
      return { ...state, schoolClasses: [] }
    default:
      return state
  }
}
