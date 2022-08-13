import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import ROWDATA from "../data/data";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./grid.css";

export default function DisplayGrid() {
  const gridRef = useRef();

  const [users] = useState(ROWDATA);

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      editable: true,
      filter: true,
    },
    columnDefs: [
      {
        field: "name",
      },
      {
        field: "username",
      },
      {
        field: "email",
      },
      {
        field: "phone",
      },
      {
        field: "website",
      },
    ],
  };

  return (
    <>
      <div
        className="grid ag-theme-alpine-dark"
        style={{ height: 300, width: 1000 }}
      >
        <AgGridReact ref={gridRef} rowData={users} gridOptions={gridOptions} />
      </div>
      <br />
    </>
  );
}
