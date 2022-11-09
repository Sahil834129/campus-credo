import { Navigate, Outlet } from 'react-router-dom'
import { getLocalData } from '../utils/helper'

export default function ProtectedRoute () {
  const user = getLocalData('token')
  if (!user) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}
