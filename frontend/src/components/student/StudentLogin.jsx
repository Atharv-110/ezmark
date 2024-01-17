import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../core/LoginForm";
const StudentLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");

  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    name: "",
    mobile_number: "",
    password: "",
    password2: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (login) {
      // code for api fetch and check

      alert("Login Success");
      navigate("/student/dashboard");
    }
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      alert("Registration Done!");
      setType("login");
    } catch (error) {
      console.error(error);
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
