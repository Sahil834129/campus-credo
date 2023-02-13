import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';
import PermissionLogout from "../components/PermissionLogout";
import { getLocalData } from '../utils/helper';

export default function ProtectedRoute({ children, roles }) {
  const user = getLocalData('token');
  const role = getLocalData('roles');
  const userHasRequiredRole = roles.includes(role) ? true : false;
  if (!user) {
    return <Navigate to='/' replace />;
  }

  if (user && !userHasRequiredRole) {
    return <Navigate to='/notFound' replace />;
  }

  return (
    <>
      <PermissionLogout />
      <Outlet />
    </>);
}
