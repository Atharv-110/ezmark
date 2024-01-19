import { useState } from "react";
import LoginForm from "../core/LoginForm";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [type, setType] = useState("login");
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });

  // console.log(detailState.setDetail);
  const handleLogin = (e) => {
    e.preventDefault();
    if (login) {
      // code for api fetch and check
      
      localStorage.setItem("role", "admin");
      alert("Login Success");
      navigate("/admin/dashboard");
    }
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    if (register) {
      // code for api fetch and check

      alert("Registration Done!");
      setType("login");
    }
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
      />
    </section>
  );
};

export default AdminLogin;
