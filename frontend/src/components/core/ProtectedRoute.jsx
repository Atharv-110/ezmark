import { Outlet, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth-service";

const ProtectedRoute = () => {
  const auth = { token: isAuthenticated() };

  return auth.token ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="*" />
    </>
  );
};

export default ProtectedRoute;
