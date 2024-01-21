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
      console.log(token);
      if (token) {
        // console.log(token.access);
        // console.log(token.refresh);
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

  // const handleRegistration = async (e) => {
  //   e.preventDefault();
  //   // role = "/student/"
  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/api/register/student/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // "Authorization": `Bearer`
  //       },
  //       body: JSON.stringify(register),
  //     });

  //     if (res.ok) {
  //       toast.success("Registration Done!");
  //       const rs = await res.json();
  //       console.log(rs.token);
  //     }

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       if (errorData.errors) {
  //         if (errorData.errors.non_field_errors) {
  //           toast.error(
  //             errorData.errors.non_field_errors[0] ===
  //               "Password and Confirm Password don't match"
  //               ? "Confirm Password did't Match"
  //               : ""
  //           );
  //         }
  //         if (errorData.errors.email[0]) {
  //           toast.error(
  //             errorData.errors.email[0] ===
  //               "user with this Email already exists."
  //               ? "User Already Exist"
  //               : ""
  //           );
  //         }
  //       }
  //     }
  //     setType("login");
  //     setRegister({
  //       email: "",
  //       name: "",
  //       mobile_number: "",
  //       password: "",
  //       password2: "",
  //     });
  //   } catch (error) {
  //     // console.error(error);
  //   }
  // };
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
      />
    </section>
  );
};

export default StudentLogin;
