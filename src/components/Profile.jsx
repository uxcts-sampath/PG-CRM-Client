import React, { useState,useEffect } from "react";
import userprofileImage from "/theme/images/faces/face29.png";

const Profile = () => {

  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("userId")

  const [userData,setUserData]=useState([])
  const [error, setError] = useState(null);


  const userDetails = () => {
    fetch(`/api/user/${userId}`, {
      method: 'GET', 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => {
      setUserData(data);      
    })
    .catch(error => {
      setError(error.message || 'Failed to fetch user data');
    });
  };

  useEffect(() => {
    userDetails();
  }, []);

console.log(userData)


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
                      <th>Hostel Name</th>
                      <th>Mobile Number</th>
                      <th>User Size</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>                 
                       <tr >
                       <td>
                         <div className="d-flex">
                           <img
                             className="img-sm rounded-circle mb-md-0 mr-2"
                             src={userprofileImage}
                             alt="profile image"
                           />
                           <div>
                             <div className=" mt-2">{userData.fullName}</div>
                           </div>
                         </div>
                       </td>
                       <td>
                         <div className="  mt-1">{userData.hostelName} </div>
                       </td> 
                       <td>
                         <div className=" mt-1">{userData.phoneNumber} </div>
                       </td>
                       <td>
                         <div className=" mt-1">{userData.userSize} </div>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  )
};

export default Profile;
