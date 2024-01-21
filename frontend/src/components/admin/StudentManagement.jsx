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
import { getManageStudents } from "../../services/get-service";


const StudentManagement = () => {
  const [users, setUsers]  = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  const fetchTableData = async () => {
    const tableData = await getManageStudents();
    setUsers(tableData)
  }

  const fetchSearchData = async (e) => {
    e.preventDefault();
    const data = await getManageStudents(search);
    setUsers(data);
  }

  useEffect(() => {
    fetchTableData()
  }, [])

  return (
    <div className="w-full flex-center flex-col gap-10">
      <form onSubmit={fetchSearchData} className="w-full flex items-stretch justify-center">
        <input
          type="text"
          placeholder="Search by name, roll number or mobile number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-3/4 p-3 px-4 shadow-sm bg-white rounded-l-md outline-none border-2 focus:border-r-0 border-transparent focus:border-2 focus:border-primary-black text-sm font-medium"
        />
        <button type="submit" className="btn bg-primary-black rounded-l-none">
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
          th: "bg-primary-black text-primary-white rounded-none text-base",
        }}
      >
        <TableHeader>
          <TableColumn key="roll_number">Role No.</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="mobile_number">Mobile Number</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No Student Data Found!"} items={items}>
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
  );
};

export default StudentManagement;
