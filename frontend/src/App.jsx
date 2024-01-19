import "./App.css";
import { Routes, Route } from "react-router-dom";
import RolePage from "./components/core/RolePage";
import AdminLogin from "./components/admin/AdminLogin";
import StudentLogin from "./components/student/StudentLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import GenerateQRPage from "./components/student/GenerateQR";
import ScanQRPage from "./components/student/ScanQR";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<RolePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/generate-qr" element={<GenerateQRPage />} />
        <Route path="/student/scan-qr" element={<ScanQRPage />} />
      </Routes>
    </main>
  );
}

export default App;
