import { useState } from "react";
import LoginForm from "../core/LoginForm";
import { useNavigate } from "react-router-dom";
import {
  registerRole,
  loginRole,
  forgetPasswordRole,
} from "../../services/auth-service";

const AdminLogin = () => {
  const role = "admin";
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");
  const [disable, setDisable] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
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
    setDisable(true);
    if (login) {
      const token = await loginRole(login, role);
      setDisable(false);
      if (token) {
        navigate("/admin/dashboard");
      }
    }
  };

  // below function will handle registration of admin
  const handleRegistration = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (register) {
      await registerRole(register, role);
      setDisable(false);
    }
    setRegister({
      email: "",
      name: "",
      mobile_number: "",
      password: "",
      password2: "",
    });
    setType("login");
  };

  // below function will handle forgot password request
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    await forgetPasswordRole(forgetEmail, role);
  };
  return (
    <section className="h-screen flex-center">
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
        disable={disable}
      />
    </section>
  );
};

export default AdminLogin;
