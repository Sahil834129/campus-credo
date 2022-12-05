import * as Yup from 'yup'
import RestEndPoint from '../redux/constants/RestEndpoints'
import RESTClient from './RestClient'

export const refreshAccessToken = async () => {
  if (getLocalData('token') == null) return
  try {
    localStorage.removeItem('token')
    const response = await RESTClient.post(RestEndPoint.REFRESH_TOKEN, {
      refreshToken: getLocalData('refreshToken')
    })
    setLocalData('token', response.data.token)
    setLocalData('refreshToken', response.data.refreshToken)
    return response.data.token
  } catch (error) {
    logout()
    console.log('Error :' + error)
  }
}

export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    //console.log("error: " + e)
  }
}

export const logout = () => {
  resetUserLoginData()
  window.location.reload()
}

export const resetUserLoginData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('name')
  localStorage.removeItem('roles')
}

export const setUserLoginData = loginData => {
  setLocalData('token', loginData.token)
  setLocalData('refreshToken', loginData.refreshToken)
  setLocalData('name', loginData?.firstName)
  setLocalData('roles', loginData?.roles)
}

export const getLocalData = key => {
  return localStorage.getItem(key)
}

export const isLoggedIn = () => {
  try {
    return localStorage.getItem('token') !== null
  } catch (e) {
    console.log('Error on getting loggen in user : ' + e)
  }
  return false
}

export const isValidatePhone = v => {
  const phoneSchema = Yup.string().matches(/^[7-9]\d{9}$/, {
    message: 'Please enter valid number.',
    excludeEmptyString: false
  })
  try {
    phoneSchema.validateSync(v)
    return true
  } catch (error) {
    return false
  }
}

export const str2bool = value => {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true
    if (value.toLowerCase() === 'false') return false
  }
  return value
}

export function humanize (str) {
  let i
  let frags = str.split('_')
  for (i = 0; i < frags.length; i++) {
    frags[i] =
      frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase()
  }
  return frags.join(' ')
}

export function convertCamelCaseToPresentableText(str) {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
}

export function gotoHome(e, navigate) {
  e.preventDefault()
  navigate(isLoggedIn() ? '/userProfile' : '/')
}
