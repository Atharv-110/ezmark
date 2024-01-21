import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from "@nextui-org/react";

import { getPendingApprovals } from "../../services/get-service";

// import { users } from "./data";

const ApprovalManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectRow, setSelectRow] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(users.length / rowsPerPage);

  const fetchTableData = async () => {
    const tableData = await getPendingApprovals();
    setUsers(tableData);
  };

  console.log(selectRow.currentKey);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div>
      <Table
        aria-label="Example table with client side pagination"
        selectionMode="single"
        selectedKeys={selectRow}
        onSelectionChange={setSelectRow}
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
          wrapper: "min-h-[250px] bg-white shadow-lg rounded-md",
          th: "bg-primary-black text-primary-white rounded-none",
          td: "data-[selected=true]:before:bg-green-500 data-[selected=true]:text-white cursor-pointer "
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="email">EMAIL</TableColumn>
          <TableColumn key="mobile_number">MOBILE NO.</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.email}>
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

export default ApprovalManagement;
