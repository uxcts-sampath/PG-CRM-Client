import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import userprofileImage from "/theme/images/faces/face29.png";


const PgStaff = () => {

  const navigate=useNavigate()
  const apiUrl = process.env.REACT_APP_API_URL;

  const userId = sessionStorage.getItem("userId")


  const token = sessionStorage.getItem("token")
  const [staffData,setStaffData]=useState([])

  const [userOpen, setUserOpen] = useState(false);

  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);

  const [selectedUser, setSelectedUser] = useState([]);




  const handleEditAction = (staffId) => {
    navigate('addstaff', { state: { user: staffId } });
  };


  const handleViewAction = (staff) => {
    setSelectedUser(staff);
    handleUserOpen();
  };



  const handleStaffData = () => {
    fetch(`${apiUrl}/api/getallstaff`, {
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
    
      setStaffData(data)
    })
    .catch(error => {
        // Handle errors occurred during fetch
        console.error('Error:', error);
    });
}



  const handleStaffDelete=async(staffId)=>{
    try {
      const response = await fetch(`${apiUrl}/api/deletestaff/${staffId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        }
      });
      
      
      if (!response.ok) {
        // If the server response is not OK, throw an error.
        throw new Error('Failed to delete hostel user');
      }
  
      // If everything went fine, log success message.
      handleStaffData();
    } catch (error) {
      // Catch and log any errors that occur during the fetch or if the response is not ok.
      console.error("Error during deletion:", error.message);
    }
  }


useEffect(()=>{
  handleStaffData()
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
                  {staffData?.length > 0 && staffData?.map((val) => (
  <tr key={val._id}>
    <td>
      <div className="d-flex">
        <img
          className="img-sm rounded-circle mb-md-0 mr-2"
          src={userprofileImage}
          alt="profile image"
        />
        <div>
          <div className="mt-2">{val.name}</div>
        </div>
      </div>
    </td>
    <td>
      <div className="mt-1">{val.mobile}</div>
    </td>

    <td>
      <div className="mt-1">{val.staffType}</div>
    </td>

    <td>
      <div className="mt-1">{val.billingDate}</div>
    </td>

    <td>
      <div className="mt-1">{val.shifts}</div>
    </td>
    
    <td>
      <div className="font-weight-bold mt-1">
        <button
          type="button"
          className="btn btn-sm border"
          onClick={() => handleEditAction(val._id)}>
          <EditIcon />
        </button>
        <button className="btn btn-sm border ml-2" onClick={() => handleViewAction(val)}>
          <VisibilityIcon />
        </button>
        <button className="btn btn-sm border ml-2" onClick={() => handleStaffDelete(val._id)}>
          <DeleteIcon />
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
            <span className="info-label">Staff Type:</span>
            <span className="info-value">{selectedUser.staffType}</span>
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
            <span className="info-label">Father Number:</span>
            <span className="info-value">{selectedUser.fatherName}</span>
          </div>
          <div className="user-info-item">
            <span className="info-label">City:</span>
            <span className="info-value">{selectedUser.residenceCity}</span>
          </div>
         


        </>
      )}
    </div>

  


  </div>
</Modal>


      </>
  )
}

export default PgStaff