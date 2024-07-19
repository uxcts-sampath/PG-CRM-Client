import { useState } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";
import Students from "./Students";
import WorkingEmp from "./WorkingEmp";
import Guests from "./Guests";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const pgUsers = () => {
  const navigate=useNavigate()
  const [value, setValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const apiUrl = process.env.REACT_APP_API_URL;



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // If no file is selected, do nothing

    setSelectedFile(file); // Store the selected file in state
    await handleBulkUpload(file); // Call handleBulkUpload with the selected file
  };

 const handleBulkUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${apiUrl}/api/bulkUpload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      // Optionally, you can navigate or show a success message here
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error scenarios here
    }
  };

  const handleDownloadTemplate = () => {
    const worksheet = XLSX.utils.json_to_sheet([
      {
        "User Type": "",
        Name: "",
        Gender: "",
        Age: "",
        "Mobile Number": "",
        "Email Address": "",
        "Aadhar Number": "",
        "Purpose For": "",
        Address: "",
        City: "",
        State: "",
        "Parent Name": "",
        "Parent Mobile Number": "",
        "Parent Email Address": "",
        "Reference By": "",
        "Billing Cycle": "",
        "Payment Type": "",
        "Require Room Type": "",
      },
    ]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "UserTemplate.xlsx");
  };




  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <h4 className="mb-0">PG Users</h4>
        </div>
        <div className="col-sm-6">
          <div className="d-flex align-items-baseline justify-content-md-end">

          <div className="pr-1 mb-3 mb-xl-0">
              <p style={{textDecoration:'underline',cursor: "pointer"}}
              onClick={handleDownloadTemplate}>
                <i className="typcn typcn-download mr-2"></i>Multi User Format</p>              
          </div>

          <div className="pr-1 mb-3 mb-xl-0">
          <input
                type="file"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleFileChange}
                id="fileInput"/>
            <label htmlFor="fileInput">
                <button
                  type="button"
                  className="btn btn-sm btn-primary btn-icon-text border"
                  onClick={() => document.getElementById("fileInput").click()}>
                  <i className="typcn typcn-upload mr-2"></i>Multi User
                </button>
              </label>  
            </div>

            <div className="pr-1 mb-2 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm btn-primary btn-icon-text border" 
                onClick={()=>navigate('addusers')}>
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
