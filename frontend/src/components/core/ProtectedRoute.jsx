import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth-service";

const ProtectedRoute = () => {
  let auth = { token: isAuthenticated() };
  return auth.token ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/admin/login" />
    </>
  );
};

export default ProtectedRoute;
