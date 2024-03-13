import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom";
import userprofileImage from "/theme/images/faces/face29.png";


const PgStaff = () => {

  const navigate=useNavigate()
  const userId = sessionStorage.getItem("userId")


  const token = sessionStorage.getItem("token")
  const [staffData,setStaffData]=useState([])

  const handleGuestsData = () => {
    fetch(`/api/getallstaff`, {
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
      console.log(data)
      setStaffData(data)
    })
    .catch(error => {
        // Handle errors occurred during fetch
        console.error('Error:', error);
    });
}


useEffect(()=>{
  handleGuestsData()
},[])

  return (
    <>
    <div className="col-sm-12">
          <div className="text-right">
            <div className="pr-1 mb-3 ">
              <button
                type="button"
                onClick={()=>navigate('addstaff')}
                className="btn btn-sm btn-primary btn-icon-text border" >
                <i className="typcn typcn-plus-outline mr-2"></i>Add Staff
              </button>
            </div>
          </div>
        </div>

  <div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap justify-content-between">
                    <h4 className="card-title mb-3">Staff List</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <input type="text" placeholder="search staff" />{" "}
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

                      <th>Department</th>

                      <th>Salary Date</th>

                      <th>Shift</th>
                    
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffData?.length>0 && staffData?.map((val)=>(

                    
                       <tr>
                       <td>
                         <div className="d-flex">
                           <img
                             className="img-sm rounded-circle mb-md-0 mr-2"
                             src={userprofileImage}
                             alt="profile image"
                           />
                           <div>
                             <div className=" mt-2">{val.name}</div>
                           </div>
                         </div>
                       </td>
                       <td>
                         <div className="  mt-1">{val.mobile}</div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{val.staffType}</div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{val.billingDate}</div>
                       </td>
 
                       <td>
                         <div className=" mt-1">{val.shifts}</div>
                       </td>
                     
                       <td>
                         <div className="font-weight-bold  mt-1">
                           <button
                             type="button"
                             className="btn btn-sm btn-secondary"
                           >
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
  )
}

export default PgStaff