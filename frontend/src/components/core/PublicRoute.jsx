import { Outlet, Navigate } from "react-router-dom";
import {
  isAuthenticated,
  isAuthenticatedStudent,
} from "../../services/auth-service";

const PublicRoute = (restricted) => {
  const auth = { token: isAuthenticated(), token1: isAuthenticatedStudent() };

//   console.log(auth);

  return auth.token && restricted ? (
    <Navigate to="/admin/dashboard" />
  ) : auth.token1 && restricted ? (
    <Navigate to="/student/dashboard" />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default PublicRoute;
