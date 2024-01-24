import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getAttendanceStudent } from "../../services/get-service";

const AttendanceRecord = () => {
  const [calDate, setCalDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [attendanceData, setAttendanceData] = useState([]);
  const rowsPerPage = 10;

  const year = calDate.getFullYear();
  const month = String(calDate.getMonth() + 1).padStart(2, "0");
  const day = String(calDate.getDate()).padStart(2, "0");
  const dateString = [year, month, day].join("-");

  const pages = Math.ceil(attendanceData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return attendanceData.slice(start, end);
  }, [page, attendanceData]);

  const fetchTableData = async () => {
    try {
      const tableData = await getAttendanceStudent(dateString);
      setAttendanceData([tableData]);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [calDate]);

  return (
    <div className="w-full flex-col-reverse gap-y-5 md:flex-row flex md:justify-between items-start">
      <div className="w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] flex-center flex-col">
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                classNames={{
                  cursor: "bg-primary-black shadow-none",
                }}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px] bg-white shadow-lg rounded-md",
            th: "bg-primary-black text-primary-white rounded-none",
          }}
        >
          <TableHeader>
            <TableColumn key="requested_date">Date</TableColumn>
            <TableColumn key="attendance_status">Status</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.requested_date}>
                {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        id="calendar"
        className="w-full flex-center md:justify-end md:w-[300px] lg:w-[350px]"
      >
        <Calendar onChange={setCalDate} value={calDate} />
      </div>
    </div>
  );
};

export default AttendanceRecord;
