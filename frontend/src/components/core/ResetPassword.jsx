import { useState } from "react";
import {
  resetPasswordAdmin,
  resetPasswordStudent,
} from "../../services/auth-service";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [newPasswords, setNewPasswords] = useState({
    password: "",
    password2: "",
  });

  const handleReset = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("forgetRole") === "admin") {
      const data = await resetPasswordAdmin(newPasswords);
      if (data) {
        localStorage.removeItem("forgetToken");
        localStorage.removeItem("forgetRole");
        navigate("/");
      }
    }
    if (localStorage.getItem("forgetRole") === "student") {
      const data = await resetPasswordStudent(newPasswords);
      if (data) {
        localStorage.removeItem("forgetToken");
        localStorage.removeItem("forgetRole");
        navigate("/");
      }
    }
  };

  return (
    <section className="h-screen flex-center">
      <div className="w-full md:w-[500px] mx-auto bg-white md:p-8 rounded-lg shadow-lg text-primary-black font-medium">
        <h1 className="text-xl capitalize font-medium text-center mb-4">
          Change Password
        </h1>
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <label>
            <span>New Password</span>
            <input
              type="password"
              value={newPasswords.password}
              onChange={(e) =>
                setNewPasswords({ ...newPasswords, password: e.target.value })
              }
              placeholder="Enter your new password"
              required
              className="form_input"
            />
          </label>
          <label>
            <span>Confirm New Password</span>

            <input
              type="password"
              value={newPasswords.password2}
              onChange={(e) =>
                setNewPasswords({ ...newPasswords, password2: e.target.value })
              }
              placeholder="Re-enter your new password"
              required
              className="form_input"
            />
          </label>

          <button type="submit" className="btn mt-2 bg-primary-black">
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
