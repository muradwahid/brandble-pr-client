import { Navigate, useLocation } from "react-router";
import { getUserInfo, isLoggedIn } from "../../helpers/user/user";
import config from "../../config";

const PrivateRoute = ({ children }) => {
  const userInfo = getUserInfo();
  const loggedIn = isLoggedIn();
  const location = useLocation();
  const currentPath = location.pathname;

  // Redirect if not logged in
  if (!userInfo || !loggedIn) {
    return (
      <Navigate
        to={config.rootClientUrl+'/signin'}
        state={{ from: location }}
        replace
      />
    );
  }

  const isAdmin = userInfo?.role === "admin" || userInfo?.role === "super-admin";
  const isClient = userInfo?.role === "client";

  // Prevent redirect loop by checking current path
  if (isClient && currentPath.startsWith("/admin")) {
    return <Navigate to="/user/dashboard" replace />;
  }

  if (isAdmin && !currentPath.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
