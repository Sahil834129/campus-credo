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
