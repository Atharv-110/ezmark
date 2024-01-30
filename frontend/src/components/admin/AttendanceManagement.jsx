import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { getManageAttendance } from "../../services/get-service";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AttendanceManagement = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [calDate, setCalDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // converted the date into required format i.e. YYYY-MM-DD (String type) for the API
  const year = calDate.getFullYear();
  const month = String(calDate.getMonth() + 1).padStart(2, "0");
  const day = String(calDate.getDate()).padStart(2, "0");
  const dateString = [year, month, day].join("-");

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const fetchTableData = async () => {
    const tableData = await getManageAttendance(dateString);
    setUsers(tableData);
    setLoading(false);
  };
  console.log(calDate);

  useEffect(() => {
    setLoading(true)
    setUsers([]);
    fetchTableData();
  }, [calDate]);

  return (
    <div className="w-full flex-col-reverse gap-y-5 md:flex-row flex md:justify-between  items-start">
      <div className="w-full md:w-[calc(100%-290px)] lg:w-[calc(100%-400px)] flex-center flex-col gap-10">
        <Table
          aria-label="Example table with client side pagination"
          isStriped
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
            base: "",
            wrapper: "min-h-[222px] bg-white shadow-lg rounded-md",
            th: "bg-primary-black text-primary-white rounded-none",
          }}
        >
          <TableHeader>
            <TableColumn key="roll_number">Roll No.</TableColumn>
            <TableColumn key="name">ROLE</TableColumn>
            <TableColumn key="email">Email</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={loading ? "Searching..." : "No Attendance Data Found!"}
            items={items}
          >
            {(item) => (
              <TableRow key={item.roll_number}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div
        id="calendar"
        className="w-full flex-center md:w-[280px] lg:w-[350px]"
      >
        <Calendar onChange={setCalDate} value={calDate}  />
      </div>
    </div>
  );
};

export default AttendanceManagement;
