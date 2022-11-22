import { humanize } from '../../utils/helper'
import { combineArray } from '../../utils/populateOptions'
import { ActionTypes } from '../constants/action-types'

const initialState = {
  schoolClasses: [],
  states: [{ value: '', text: 'Select State' }],
  disabilities: [],
  parentOccupation: []
}
export const MasterData = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SCHOOL_CLASS:
      return { ...state }
    case ActionTypes.GET_SCHOOL_CLASS_SUCCESS:
      return { ...state, schoolClasses: combineArray(payload) }
    case ActionTypes.GET_SCHOOL_CLASS_ERROR:
      return { ...state, schoolClasses: [] }

    case ActionTypes.GET_STATES:
      return { ...state }
    case ActionTypes.GET_STATES_SUCCESS:
      const states = initialState.states
      return {
        ...state,
        states: states.concat(
          payload.map(it => ({ value: it.id, text: it.name }))
        )
      }
    case ActionTypes.GET_STATES_ERROR:
      return { ...state, states: initialState.states }

    case ActionTypes.GET_DISABILITIES:
      return { ...state }
    case ActionTypes.GET_DISABILITIES_SUCCESS:
      return {
        ...state,
        disabilities: payload.map(it => ({ value: it, text: humanize(it) }))
      }
    case ActionTypes.GET_DISABILITIES_ERROR:
      return { ...state, disabilities: [] }

    case ActionTypes.GET_PARENT_OCCUPATION:
      return { ...state }
    case ActionTypes.GET_PARENT_OCCUPATION_SUCCESS:
      return {
        ...state,
        parentOccupation: payload.map(it => ({ value: it, text: humanize(it) }))
      }
    case ActionTypes.GET_PARENT_OCCUPATION_ERROR:
      return { ...state, disabilities: [] }

    default:
      return state
  }
}
