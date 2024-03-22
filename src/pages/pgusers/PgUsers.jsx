// import React from "react";

// const pgUsers = () => {
//   return <div>PG Users List</div>;
// };

// export default pgUsers;

import { useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import Students from "./Students";
import WorkingEmp from "./WorkingEmp";
import Guests from "./Guests";

const pgUsers = () => {
  const navigate=useNavigate()
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <h4 className="mb-0">PG Users</h4>
          {/* <p>Your last login: 21h ago from newzealand.</p> */}
        </div>
        <div className="col-sm-6">
          <div className="d-flex align-items-center justify-content-md-end">
            <div className="pr-1 mb-3 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm btn-primary btn-icon-text border" 
                onClick={()=>navigate('addusers')}
              >
                <i className="typcn typcn-plus-outline mr-2"></i>Add User
              </button>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Students" />
        <Tab label="Working Emps" />
        <Tab label="Guests" />
      </Tabs>
      <Typography>
        {value === 0 && (
          <div>
            {" "}
            <Students />{" "}
          </div>
        )}
        {value === 1 && (
          <div>
            {" "}
            <WorkingEmp />{" "}
          </div>
        )}
        {value === 2 && (
          <div>
            {" "}
            <Guests />
          </div>
        )}
      </Typography>
    </div>
  );
};

export default pgUsers;
