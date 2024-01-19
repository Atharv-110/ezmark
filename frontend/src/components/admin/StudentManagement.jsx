import { useState, useMemo } from "react";
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

import { users } from "./data";

const StudentManagement = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <div className="w-full flex-center flex-col gap-10">
      <form className="w-full flex items-stretch justify-center">
        <input
          type="text"
          placeholder="Search by name or roll number"
          // value={searchText}
          // onChange={handleSearchChange}
          required
          className="w-3/4 p-3 px-4 shadow-sm bg-white rounded-l-md outline-none border-2 focus:border-r-0 border-transparent focus:border-2 focus:border-primary-black text-sm font-medium"
        />
        <button className="btn rounded-l-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
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
          base: "",
          wrapper: "min-h-[222px] bg-white shadow-lg rounded-md",
          th: "bg-primary-black text-primary-white rounded-none",
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
  );
};

export default StudentManagement;
