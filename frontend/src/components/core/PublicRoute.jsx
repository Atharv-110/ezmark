import { Outlet, Navigate } from "react-router-dom";
import {
  isAuthenticated,
  isAuthenticatedStudent,
} from "../../services/auth-service";
import HeroHeader from "./HeroHeader";
import Footer from "./Footer";

const PublicRoute = (restricted) => {
  const auth = { token: isAuthenticated(), token1: isAuthenticatedStudent() };

  if (auth.token && restricted) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (auth.token1 && restricted) {
    return <Navigate to="/student/dashboard" />;
  }

  return (
    <>
      <HeroHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;