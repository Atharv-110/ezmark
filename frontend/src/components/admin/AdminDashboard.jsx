import Navbar from "../core/Navbar";
import CurrentDateTimeCard from "../core/CurrentDateTimeCard";
import MetricCard from "../core/MetricCard";
import StudentManagement from "./StudentManagement";
import AttendanceManagement from "./AttendanceManagement";
import { useState } from "react";

const AdminDashboard = () => {
  const [studentManagement, setStudentManagement] = useState(false);
  const [attendanceManagement, setAttendanceManagement] = useState(false);
  return (
    <section className="w-full md:w-[95%] mx-auto">
      <Navbar />
      <section className="panel_section flex-center gap-4 md:gap-10 flex-wrap">
        <CurrentDateTimeCard />
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </section>
      <hr />
      <section className="panel_section w-full md:w-fit mx-auto">
        <h1 className="text-center mb-4 text-xl font-medium">
          Quick access links
        </h1>
        <div className="flex gap-1 md:gap-8">
          <button
            onClick={() =>
              setStudentManagement(true) && setAttendanceManagement(false)
            }
            className="btn"
          >
            Manage Students
          </button>
          <button
            onClick={() => setAttendanceManagement(true)}
            className="btn_bordered"
          >
            Manage Attendance
          </button>
        </div>
      </section>
      <section className="panel_section">
        {studentManagement ? (
          <StudentManagement />
        ) : attendanceManagement ? (
          <AttendanceManagement />
        ) : (
          <></>
        )}
      </section>
    </section>
  );
};

export default AdminDashboard;
