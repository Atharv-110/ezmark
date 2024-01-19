import Navbar from "../core/Navbar";
import { useNavigate } from "react-router-dom";
import CurrentDateTimeCard from "../core/CurrentDateTimeCard";
import MetricCard from "../core/MetricCard";
import AttendanceRecord from "./AttendanceRecord";

const StudentDashboard = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full px-2 mt-24 md:mt-32">
      <Navbar />
      <section className="panel_section flex flex-col items-center md:items-stretch md:flex-row gap-8 md:gap-4 md:justify-between flex-wrap">
        <div className="hidden md:block w-full md:w-[200px] lg:w-[300px]">
          <CurrentDateTimeCard />
        </div>
        <div className="w-full md:w-[calc(100%-250px)] lg:w-[calc(100%-400px)] flex flex-col gap-4 lg:gap-10 justify-between">
          <div className="flex items-center justify-between">
            <MetricCard />
            <MetricCard />
            <MetricCard />
          </div>
          <div>
            <h1 className="mb-4 text-xl font-medium">
              Quick access links
            </h1>
            <div className="flex max-sm:flex-wrap max-sm:justify-center gap-2 md:gap-8 items-center">
              <button
                onClick={() => navigate("/student/generate-qr")}
                className="toggle_btn hover:bg-transparent hover:text-primary-black border-2 hover:border-2 hover:border-primary-black transition-effect"
              >
                Generate QR
              </button>
              <button
                onClick={() => navigate("/student/scan-qr")}
                className="toggle_btn_bordered hover:bg-primary-black hover:text-primary-white border-2 hover:border-2 hover:border-transparent transition-effect"
              >
                QR Scanner
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="panel_section">
        <h1 className="mb-2 text-xl md:text-3xl text-center md:text-left font-bold">
          Your Attendance
        </h1>
        <AttendanceRecord />
      </section>
    </section>
  );
};

export default StudentDashboard;
