import { Navigate, useLocation } from "react-router";
import { getUserInfo, isLoggedIn } from "../../helpers/user/user";


const PrivateRoute = ({ children }) => {
  
  const userInfo = getUserInfo();
  const loggedIn = isLoggedIn();
  const location = useLocation(); 
  const currentPath = location.pathname; 

  if (!userInfo || !loggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const isAdmin = userInfo.role === "admin" || userInfo.role === "super-admin";
  const isClient = userInfo.role === "client";

  if (isClient && currentPath.startsWith('/admin')) {
    return <Navigate to="/user/dashboard" state={{ from: location }} replace />;
  }

  if (isAdmin && currentPath.startsWith('/')) {
    // Redirect them to their own dashboard
    return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;