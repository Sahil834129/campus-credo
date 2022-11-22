import RESTClient from '../../utils/RestClient'
import RestEndPoint from '../constants/RestEndpoints'
import { ActionTypes } from '../constants/action-types'

export const getSchoolClasses = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_SCHOOL_CLASS })
    RESTClient.get(RestEndPoint.GET_SCHOOL_CLASSES)
      .then(response => {
        console.log('response.data', response.data)
        dispatch({
          type: ActionTypes.GET_SCHOOL_CLASS_SUCCESS,
          payload: response.data.classes
        })
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_SCHOOL_CLASS_ERROR, payload: error })
      })
  }
}

export const getStates = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_STATES })
    RESTClient.get(RestEndPoint.GET_STATE)
      .then(response => {
        console.log('response.data', response.data)
        dispatch({
          type: ActionTypes.GET_STATES_SUCCESS,
          payload: response.data.states
        })
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_STATES_ERROR, payload: error })
      })
  }
}

export const getDisabilites = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_DISABILITIES })
    RESTClient.get(RestEndPoint.GET_DISABILITIES)
      .then(response => {
        console.log('response.data', response.data)
        dispatch({
          type: ActionTypes.GET_DISABILITIES_SUCCESS,
          payload: response.data.disabilities
        })
      })
      .catch(error => {
        dispatch({ type: ActionTypes.GET_DISABILITIES_ERROR, payload: error })
      })
  }
}

export const getParentOCcupation = () => {
  return dispatch => {
    dispatch({ type: ActionTypes.GET_PARENT_OCCUPATION })
    RESTClient.get(RestEndPoint.GET_PARENT_OCCUPATION)
      .then(response => {
        console.log('response.data', response.data)
        dispatch({
          type: ActionTypes.GET_PARENT_OCCUPATION_SUCCESS,
          payload: response.data.occupations
        })
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.GET_PARENT_OCCUPATION_ERROR,
          payload: error
        })
      })
  }
}
