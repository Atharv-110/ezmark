import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RolePage = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "student") {
      navigate("/student/login");
    } else if (role === "admin") {
      navigate("/admin/login");
    }
  }, [role]);

  return (
    <section className="h-screen flex-center">
      <div className="w-[700px] bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-center my-6 text-2xl font-medium">Select a Role</h1>
        <div className="flex-center gap-9">
          <div>
            <h2 className="text-center text-lg font-medium">Student</h2>
            <button onClick={() => setRole("student")} className="btn px-0 py-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
          </div>
          <div>
            <h2 className="text-center text-lg font-medium">Admin</h2>
            <button onClick={() => setRole("admin")} className="btn px-0 py-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolePage;
