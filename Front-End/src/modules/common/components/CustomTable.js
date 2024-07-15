import React, { useState, useMemo, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTableData = async ({ queryKey }) => {
  const [_, endpoint, pageIndex = 1, pageSize, filter] = queryKey;
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/${endpoint}`
  );
  return data;
};

const Table = ({ columns, endpoint }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState("");

  //   const { data, isLoading, error } = useQuery(
  //     ["tableData", endpoint, page, pageSize, filter],
  //     fetchTableData,
  //     { keepPreviousData: true }
  //   );
  const data = [{}];

  console.log({ data });

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: data ? data.items : [],
    manualPagination: true,
    pageCount: data ? Math.ceil(data.total / pageSize) : 0,
    initialState: { pageIndex: page },
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page: tablePage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize: setTablePageSize,
    state: { pageIndex, pageSize: tablePageSize },
  } = table;

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(0); // Reset to the first page when filter changes
  };

  useMemo(() => {
    setTablePageSize(pageSize);
  }, [pageSize, setTablePageSize]);

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table {...getTableProps()} className="w-full border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="border p-2">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tablePage.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border p-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={tablePageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="px-4 py-2 border rounded-lg"
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
