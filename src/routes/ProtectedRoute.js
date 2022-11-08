import { Navigate, Outlet } from 'react-router-dom'
import { getLocalData } from '../utils/helper'

export default function ProtectedRoute () {
  const user = getLocalData('token')
  console.log(user)
  if (!user) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
