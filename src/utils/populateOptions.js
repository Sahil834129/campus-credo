import RestEndPoint from '../redux/constants/RestEndpoints'
import RESTClient from './RestClient'

export const combineArray = arr => {
  return [{ value: '', text: 'Select Class' }].concat(
    arr.map(it => ({ value: it, text: it }))
  )
}

export const popularSchoolClasses = async () => {
  try {
    return RESTClient.get(RestEndPoint.GET_SCHOOL_CLASSES)
  } catch (e) {
    console.log('Error while getting classes list' + e)
  }
}
