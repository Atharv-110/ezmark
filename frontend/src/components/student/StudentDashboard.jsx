import { getStudentDashboardMetrics } from "../../services/get-service";
import { useState, useEffect } from "react";
import Navbar from "../core/Navbar";
import CurrentDateTimeCard from "../core/CurrentDateTimeCard";
import MetricCard from "../core/MetricCard";
import AttendanceRecord from "./AttendanceRecord";
import GenerateQRPage from "./GenerateQR";
import ScanQRPage from "./ScanQR";

const StudentDashboard = () => {
  const [generateQR, setGenerateQR] = useState(false);
  const [scanQR, setScanQR] = useState(false);

  const [dashboardMetrics, setDashboardMetrics] = useState({
    student: "",
    email: "",
    totalDays: "",
    presentDays: "",
    absentDays: "",
  });

  useEffect(() => {
    fetchDashboardMetrics();
  }, [scanQR]);

  const fetchDashboardMetrics = async () => {
    try {
      const data = await getStudentDashboardMetrics();
      setDashboardMetrics({
        student: data.student_name,
        email: data.student_email,
        totalDays: data.total_days,
        presentDays: data.present_days,
        absentDays: data.absent_days,
      });
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  let componentToRender;

  if (generateQR) {
    componentToRender = <GenerateQRPage setGenerateQR={setGenerateQR} />;
  } else if (scanQR) {
    componentToRender = <ScanQRPage setScanQR={setScanQR} />;
  } else {
    componentToRender = (
      <>
        <section className="panel_section flex flex-col items-center md:items-stretch md:flex-row gap-8 md:gap-4 md:justify-between flex-wrap">
          <div className="hidden md:block w-full md:w-[200px] lg:w-[300px]">
            <CurrentDateTimeCard />
          </div>
          <div className="w-full md:w-[calc(100%-250px)] lg:w-[calc(100%-400px)] flex flex-col gap-4 lg:gap-10 justify-between">
            <div className="flex items-center justify-between">
              <MetricCard
                title="Total Days"
                value={dashboardMetrics.totalDays}
              />
              <MetricCard
                title="Present Days"
                value={dashboardMetrics.presentDays}
              />
              <MetricCard
                title="Absent Days"
                value={dashboardMetrics.absentDays}
              />
            </div>
            <div>
              <h1 className="mb-4 text-xl max-sm:text-center font-medium">
                Quick access links
              </h1>
              <div className="flex max-sm:flex-wrap max-sm:justify-center gap-2 md:gap-8 items-center">
                <button
                  onClick={() => setGenerateQR(true)}
                  className="toggle_btn hover:bg-transparent hover:text-primary-black border-2 hover:border-2 hover:border-primary-black transition-effect"
                >
                  Generate QR
                </button>
                <button
                  onClick={() => setScanQR(true)}
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
      </>
    );
  }

  return (
    <section className="w-full px-2 mt-24 md:mt-28">
      <Navbar
        role="student"
        name={dashboardMetrics.student}
        email={dashboardMetrics.email}
      />
      {componentToRender}
    </section>
  );
};

export default StudentDashboard;
