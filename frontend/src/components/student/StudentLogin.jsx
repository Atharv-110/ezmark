import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../core/LoginForm";
import {
  registerRole,
  loginRole,
  forgetPasswordRole,
} from "../../services/auth-service";

const StudentLogin = () => {
  const role = "student";
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");
  const [disable, setDisable] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    name: "",
    mobile_number: "",
    password: "",
    password2: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setDisable(true);
    if (login) {
      // code for api fetch and check
      const token = await loginRole(login, role);
      setDisable(false);
      if (token) {
        navigate("/student/dashboard");
      }
    }
  };

  const handleRegister = async (e) => {
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
        role="student"
        login={login}
        setLogin={setLogin}
        handleLogin={handleLogin}
        register={register}
        setRegister={setRegister}
        handleRegistration={handleRegister}
        forgetEmail={forgetEmail}
        setForgetEmail={setForgetEmail}
        handleForgetPassword={handleForgetPassword}
        disable={disable}
      />
    </section>
  );
};

export default StudentLogin;
