import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const isAuthenticated = localStorage.getItem("AccessToken");
  if (isAuthenticated) {
    const user = { loggedIN: true };
    return user && user.loggedIN;
  } else {
    const user = { loggedIN: false };
    return user && user.loggedIN;
  }
};
const PublicRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
