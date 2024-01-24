import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../core/LoginForm";
import { registerRole, loginRole, forgetPasswordRole } from "../../services/auth-service";

const StudentLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");
  const [forgetEmail, setForgetEmail] = useState("");
  const role = "student";

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
    if (login) {
      // code for api fetch and check
      const token = await loginRole(login, role);
      if (token) {
        navigate("/student/dashboard");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = register;
    await registerRole(registerData, role);

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
    await forgetPasswordRole(forgetEmail, role)

  }

  return (
    <section className="flex-center py-20">
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
      />
    </section>
  );
};

export default StudentLogin;
