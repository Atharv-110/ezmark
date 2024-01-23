import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamCardSection from "./TeamCardSection";
import KeyBenefitSection from "./KeyBenefitSection";
import Glimpse from "./Glimpse";

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
    <section className="bg_img mb-20 max-sm:px-2 text-primary-black">
      <section className="h-screen flex-center flex-col gap-16">
        <div className="text-sm md:text-base flex-center gap-2 bg-white w-fit py-2 px-2 md:px-3 rounded-lg shadow-md">
          <div className="bg-blue-400 px-2 md:px-4 w-fit rounded-md text-primary-white font-medium">
            New
          </div>
          <div className="font-medium">Geofenced Attendance Marking</div>
        </div>
        <div className="w-full flex-center flex-col gap-y-2">
          <h1 className="text-3xl md:text-6xl md:leading-[1.2] text-center md:tracking-wide font-semibold">
            Your Instant Solution for <br className="max-sm:hidden" />
            Attendance & Student Management
          </h1>
          <p className="w-full md:w-1/2 max-sm:text-sm text-center text-gray-dark md:leading-6">
            Effortlessly streamlining attendance and student management, making
            the process hassle-free and highly efficient.
          </p>
        </div>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-center text-lg font-semibold">
            Login or Register as
          </h3>
          <div className="flex-center gap-8">
            <button
              onClick={() => setRole("student")}
              className="btn rounded-lg gap-1 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-[25px] h-[25px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <h2 className="text-center text-lg font-medium">Student</h2>
            </button>
            <button
              onClick={() => setRole("admin")}
              className="btn_bordered rounded-lg gap-1 flex items-center px-4 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-[25px] h-[25px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>
              <h2 className="text-center text-lg font-medium">Admin</h2>
            </button>
          </div>
        </div>
      </section>
      <Glimpse />
      <KeyBenefitSection />
      <TeamCardSection />
    </section>
  );
};

export default RolePage;
