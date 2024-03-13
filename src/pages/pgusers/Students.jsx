import React, { useState,useEffect } from "react";
import userprofileImage from "/theme/images/faces/face29.png";
import { useNavigate } from "react-router-dom";


const Students = () => {

  const token = sessionStorage.getItem("token")
  const [studentData,setStudentData]=useState([])
  const navigate= useNavigate()
  
  const handleEditAction = (student) => {
    navigate('addusers', { state: { user: student } });
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
      console.log('dfdfdf',data)
      setStudentData(data)
    })
    .catch(error => {
        // Handle errors occurred during fetch
        console.error('Error:', error);
    });
}
    
  
  useEffect(() => {
    handleStudentData();
  }, []); // Ensure proper dependencies are included if needed
  

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
                       {/* <td>
                         <div className=" mt-1">#{student.allotRoom.room}</div>
                       </td> */}
                       <td>
                         <div className=" mt-1">{student._id}</div>
                       </td>
                       <td>
                         <div className=" text-success  mt-1">Pending</div>
                       </td>
                       <td>
                         <div className="font-weight-bold  mt-1">
                         <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={() => handleEditAction(student)}>
                            edit actions
                          </button>
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
    </>
  );
};

export default Students;
