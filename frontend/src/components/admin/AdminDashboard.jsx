import Navbar from "../core/Navbar";
import CurrentDateTimeCard from "../core/CurrentDateTimeCard";
import MetricCard from "../core/MetricCard";
import StudentManagement from "./StudentManagement";
import AttendanceManagement from "./AttendanceManagement";
import ApprovalManagement from "./ApprovalManagement";
import { useState } from "react";

const AdminDashboard = () => {
  const [studentManagement, setStudentManagement] = useState(true);
  const [attendanceManagement, setAttendanceManagement] = useState(false);
  const [approvalManagement, setApprovalManagement] = useState(false);

  const handleStudentSection = () => {
    setApprovalManagement(false);
    setStudentManagement(true);
    setAttendanceManagement(false);
  };
  const handleAttendanceSection = () => {
    setApprovalManagement(false);
    setStudentManagement(false);
    setAttendanceManagement(true);
  };
  const handleApprovalSection = () => {
    setApprovalManagement(true);
    setStudentManagement(false);
    setAttendanceManagement(false);
  };

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
              Quick Access Links
            </h1>
            <div className="flex max-sm:flex-wrap max-sm:justify-center gap-2 items-center justify-between">
              <button
                onClick={handleStudentSection}
                className={
                  studentManagement ? "toggle_btn" : "toggle_btn_bordered"
                }
              >
                Manage Students
              </button>
              <button
                value="attendance-section"
                onClick={handleAttendanceSection}
                className={
                  attendanceManagement ? "toggle_btn" : "toggle_btn_bordered"
                }
              >
                Manage Attendance
              </button>
              <button
                value="attendance-section"
                onClick={handleApprovalSection}
                className={
                  approvalManagement ? "toggle_btn" : "toggle_btn_bordered"
                }
              >
                Pending Approvals
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="panel_section">
        {attendanceManagement ? (
          <AttendanceManagement />
        ) : approvalManagement ? (
          <ApprovalManagement />
        ) : (
          <StudentManagement />
        )}
      </section>
    </section>
  );
};

export default AdminDashboard;
