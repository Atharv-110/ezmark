import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../core/LoginForm";
const StudentLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");

  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  console.log(register);
  const handleLogin = (e) => {
    e.preventDefault();
    if (login) {

      // code for api fetch and check

      alert("Login Success");
      navigate("/student/dashboard");
    }
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    if (register) {

      // code for api fetch and check

      alert("Registration Done!");
      setType("login")
    }
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
        handleRegistration={handleRegistration}
      />
    </section>
  );
};

export default StudentLogin;
