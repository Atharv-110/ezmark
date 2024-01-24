import { useState } from "react";
import LoginForm from "../core/LoginForm";
import { useNavigate } from "react-router-dom";
import { registerRole, loginRole, forgetPasswordRole } from "../../services/auth-service";

const AdminLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");
  const [forgetEmail, setForgetEmail] = useState("");
  const role = "admin";
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    password2: "",
  });

  // below function will handle login of admin
  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginRole(login, role);
    if(token) {
      navigate("/admin/dashboard")
    }
  };

  // below function will handle registration of admin
  const handleRegistration = async (e) => {
    e.preventDefault();
    const registerData = register;
    const token = await registerRole(registerData, role);
    if (token) {
      setRegister({
        email: "",
        name: "",
        mobile_number: "",
        password: "",
        password2: "",
      });
      setType("login");
    }
  };

  // below function will handle forgot password request
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    await forgetPasswordRole(forgetEmail, role)

  }
  return (
    <section className="flex-center py-20">
      <LoginForm
        type={type}
        setType={setType}
        role="admin"
        login={login}
        setLogin={setLogin}
        handleLogin={handleLogin}
        register={register}
        setRegister={setRegister}
        handleRegistration={handleRegistration}
        forgetEmail={forgetEmail}
        setForgetEmail={setForgetEmail}
        handleForgetPassword={handleForgetPassword}
      />
    </section>
  );
};

export default AdminLogin;
