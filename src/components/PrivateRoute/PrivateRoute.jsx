// import { Navigate } from "react-router";
// import { getUserInfo, isLoggedIn } from "../../helpers/user/user";


const PrivateRoute = ({children}) => {
  // const userInfo = getUserInfo();
  // const useLoggedIn = isLoggedIn()
  // if (!userInfo && !useLoggedIn) {
  //   return <Navigate to="/auth/login" state={{ from: location }} replace />;
  // }
  return children;
};

export default PrivateRoute;