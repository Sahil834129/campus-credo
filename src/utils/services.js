import RestEndPoint from '../redux/constants/RestEndpoints'
import RESTClient from './RestClient'

export const getClassAdmissionData = () => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_DATA)
}

export const saveClassAdmissionData = (data) => {
  return RESTClient.post(RestEndPoint.CLASS_ADMISSION_DATA, data)
}
