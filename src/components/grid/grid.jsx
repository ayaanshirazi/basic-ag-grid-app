/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
/* import ROWDATA from '../Data/data'; */
import ROWDATA from '../data/data';
import EditForm from '../form/form';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './grid.css';
import mysvg from '../data/logo.svg';
import { 
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box 
} from '@mui/material';

export default function DisplayGrid() {
  const gridRef = useRef();
  const initialState = {
    id: null,
    workRequestId: '',
    username: '',
    email: '',
    phone: '',
    website: '',
  };
  const [users, setUsers] = useState(ROWDATA);
  const [currentUser, setCurrentUser] = useState(initialState);

  const [showForm, setShowForm] = useState(true);
  const onClickForm = () => setShowForm(!showForm);

  /* const OnResetForm = () => useState(initialState); */

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  const gridOptions = {
    defaultColDef: {
      sortable: true,
      editable: false,
      filter: true,
      floatingFilter: true
    },
    columnDefs: [
      {
        field: 'workRequestId',
      },
      {
        field: 'worksRequestDetails',
      },
      {
        field: 'workDescription',
      },
      {
        field: 'worksRequestDate',
      },
      {
        field: 'status',
      },
      {
        field: 'dueDate',
      },
      /* {
        field: 'dateWorkRequested', filter: 'agDateColumnFilter'
      }, */
      /* {
        field: 'buildingCode',
      },
      {
        field: 'problemType',
      },
      {
        field: 'requestedBy',
      },
      {
        field: 'requestersPhone',
      }, */
    ],
  };

  const onRowSelected = (params) => {
   setCurrentUser({
      id: params.data.id,
      workRequestId: params.data.workRequestId,
      dateWorkRequested: params.data.dateWorkRequested,
      buildingCode: params.data.buildingCode,
      problemType: params.data.problemType,
      workDescription: params.data.workDescription,
      requestedBy: params.data.requestedBy,
      requestorsPhone: params.data.requestersPhone
    });
  };

  /* const OnResetForm = (params) => {
    setCurrentUser({
      id: null,
      workRequestId: '',
      dateWorkRequested: '',
      buildingCode: '',
      problemType: '',
      workDescription: '',
      requestedBy: '',
      requestorsPhone: '',
     });
   };
   */

  return (
    <>
     <toolbar>
       <div id='title'>          
          <h1 style={{ marginTop: 0}}><center><img src={mysvg} alt="Your SVG" height={90} /></center></h1>
        </div>
        <p className="header">Internal Maintenance Request</p>
        </toolbar>
      
      <div>
        <div>
          {/* <button className="button" onClick={onClickForm}>
            Form
          </button> */}
          <br />
          {/* <button className="button" onClick={OnResetForm}>
            Clear Form
          </button> */}
          {/* {showForm ? (
            <EditForm currentUser={currentUser} updateUser={updateUser} />
          ) : null} */}
          <EditForm currentUser={currentUser} updateUser={updateUser} />
        </div>
        <br />
      </div>
      
      <br />
      <div
        className="grid ag-theme-alpine"
        style={{ height: 500, width: 1220, marginTop: 0, marginBottom: 40 }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={users}
          gridOptions={gridOptions}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
        />
      </div>
    </>
  );
}