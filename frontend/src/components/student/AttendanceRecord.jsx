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

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { users } from "../admin/data";
const AttendanceRecord = () => {
  const [calDate, setCalDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <div className="w-full flex-col-reverse gap-y-5 md:flex-row flex md:justify-between items-start">
      <div className="w-full md:w-[calc(100%-290px)] lg:w-[calc(100%-400px)] flex-center flex-col">
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
                  cursor:
                    "bg-primary-black shadow-none",
                }}
              />
            </div>
          }
          classNames={{
            base: "",
            wrapper: "min-h-[222px] bg-white shadow-lg rounded-md",
            th: "bg-primary-black text-primary-white rounded-none"
          }}
        >
          <TableHeader>
            <TableColumn key="name">NAME</TableColumn>
            <TableColumn key="role">ROLE</TableColumn>
            <TableColumn key="status">STATUS</TableColumn>
            <TableColumn key="col4">COL4</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.name}>
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
        <Calendar onChange={setCalDate} value={calDate} />
      </div>
    </div>
  );
};

export default AttendanceRecord;
