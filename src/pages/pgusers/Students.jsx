import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import userprofileImage from "/theme/images/faces/face29.png";



const Students = () => {

  const token = sessionStorage.getItem("token");
  const [studentData, setStudentData] = useState([]);
  const [roomDetailsFetched, setRoomDetailsFetched] = useState(false); 
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);

  const handleEditAction = (student) => {
    navigate('addusers', { state: { user: student } });
  };

  const handleViewAction = (student) => {
    setSelectedUser(student);
    handleUserOpen();
  };

  const handleStudentData = () => {
    fetch("/api/students", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudentData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    handleStudentData();
  }, []);

  console.log(studentData)

  useEffect(() => {
    if (studentData.length > 0 && !roomDetailsFetched) {
      studentData.forEach(student => {
        fetchRoomDetails(student.room, student._id); // Pass student._id to identify which student is being updated
      });
      setRoomDetailsFetched(true); // Mark room details as fetched
    }
  }, [studentData, roomDetailsFetched]); // Make sure studentData and roomDetailsFetched are included as dependencies

  const fetchRoomDetails = (roomId, studentId) => {
    fetch(`/api/room/${roomId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update studentData with roomNumber for the corresponding student
        setStudentData(prevStudentData => {
          return prevStudentData.map(student => {
            if (student._id === studentId) {
              return { ...student, roomNumber: data.roomNumber };
            }
            return student;
          });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
 

  

  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap justify-content-between">
                    <h4 className="card-title mb-3">Students List</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <input type="text" placeholder="search student" />{" "}
                    <button className=" btn-outline-secondary">search</button>
                  </div>
                </div>
              </div>


              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="d-flex">
                          <div>
                            <div className="m-l-2"> Name</div>
                          </div>
                        </div>
                      </th>
                      <th>Mobile</th>

                      <th>Studing at</th>

                      <th>City From</th>

                      <th>State</th>
                      <th>Room</th>
                      <th>Billing Date</th>
                      <th>Fee Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentData?.length>0 && studentData?.map((student)=>(
                       <tr key={student._id}>
                       <td>
                         <div className="d-flex">
                           <img
                             className="img-sm rounded-circle mb-md-0 mr-2"
                             src={userprofileImage}
                             alt="profile image"
                           />
                           <div>
                             <div className=" mt-2">{student.name}</div>
                           </div>
                         </div>
                       </td>
                       <td>
                         <div className="  mt-1">{student.mobile} </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{student.studyingAt} </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{student.residenceCity} </div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{student.state}</div>
                       </td>
                       <td>
                         <div className=" mt-1">{student.roomNumber}</div>
                       </td>
                       {/* <td>
                         <div className=" mt-1">{student._id}</div>
                       </td> */}
                       <td>
                         <div className=" text-success  mt-1">Pending</div>
                       </td>
                       <td>
                         <div className=" text-success  mt-1">Pending</div>
                       </td>
                       <td>
                         <div className="font-weight-bold  mt-1">
                         <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEditAction(student)}>
                            edit actions
                          </button>
                          <button  className="btn btn-sm btn-primary ml-4" onClick={() => handleViewAction(student)}>view</button>
                         </div>
                       </td>
                     </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


     <Modal
  open={userOpen}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className="modal-container"
>
  <div className="modal-content">
    {/* Modal Content */}
    <Typography style={{ cursor: 'pointer', textAlign: 'end' }} onClick={handleUserClose}>
      <ClearIcon />
    </Typography>


    {/* User Details */}
    <div>
      {selectedUser && (
        <>
          <div className="user-info-item">
            <span className="info-label">User Type:</span>
            <span className="info-value">{selectedUser.userType}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">User Name:</span>
            <span className="info-value">{selectedUser.name}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Mobile:</span>
            <span className="info-value">{selectedUser.mobile}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Aadhar Number:</span>
            <span className="info-value">{selectedUser.aadharNumber}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Phone Number:</span>
            <span className="info-value">{selectedUser.mobile}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">Father Number:</span>
            <span className="info-value">{selectedUser.fatherName}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">City:</span>
            <span className="info-value">{selectedUser.residenceCity}</span>
          </div>
          <div className="user-info-item">
  <span className="info-label">Room Number:</span>
  <span className="info-value">{selectedUser.roomNumber}</span>
</div>


        </>
      )}
    </div>
  </div>
</Modal>


    </>
  );
};

export default Students;
