import "./App.css";
import { Routes, Route } from "react-router-dom";
import RolePage from "./components/core/RolePage";
import AdminLogin from "./components/admin/AdminLogin";
import StudentLogin from "./components/student/StudentLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import ResetPasswordPage from "./components/core/ResetPassword";
import ProtectedRoute from "./components/core/ProtectedRoute";
import ProtectedRouteStudent from "./components/core/ProtectedRouteStudent";
import PageNotFound from "./components/core/PageNotFound";

function App() {
  const forgetToken = localStorage.getItem("forgetToken")
    ? localStorage.getItem("forgetToken")
    : null;
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<RolePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRouteStudent />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          {/* <Route path="/student/generate-qr" element={<GenerateQRPage />} />
          <Route path="/student/scan-qr" element={<ScanQRPage />} /> */}
        </Route>

        <Route
          path={
            localStorage.getItem("forgetRole")==="admin"
              ? `/reset-password/${forgetToken}`
              : `/reset-password-student/${forgetToken}`
          }
          element={<ResetPasswordPage />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
