import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticatedStudent } from "../../services/auth-service";

const ProtectedRouteStudent = () => {
  const auth = { token: isAuthenticatedStudent() };

  return auth.token ? <Outlet /> : <Navigate to="*" />;
};

export default ProtectedRouteStudent;
