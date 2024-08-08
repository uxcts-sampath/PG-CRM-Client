import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import userprofileImage from "/theme/images/faces/face29.png";


const WorkingEmp = () => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '30px',
};

const deleteModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

  const token = sessionStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [workingEmpData, setWorkingEmpData] = useState([]);
  const [roomDetailsFetched, setRoomDetailsFetched] = useState(false); 
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOpen,setDeleteOpen]=useState(false)


  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  

  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);

  const handleDeleteOpen =()=>setDeleteOpen(true);
  const handleDeleteClose =()=>setDeleteOpen(false)
  
  const handleEditAction = (workingEmp) => {
    navigate('addusers', { state: { user: workingEmp } });
  };
  
  const handleViewAction = (workingEmp) => {
    setSelectedUser(workingEmp);
    handleUserOpen();
  };
  

  const handleWorkingEmpData = () => {
    fetch(`${apiUrl}/api/working-emp`, {
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
      setWorkingEmpData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };
  
  useEffect(() => {
    handleWorkingEmpData();
  }, []);
  


useEffect(() => {
  if (workingEmpData.length > 0 && !roomDetailsFetched) {
    workingEmpData.forEach(workingEmp => {
      fetchRoomDetails(workingEmp.room, workingEmp._id); 
    });
    setRoomDetailsFetched(true); // Mark room details as fetched
  }
}, [workingEmpData, roomDetailsFetched]);


const fetchRoomDetails = (roomId, workingEmpId) => {
  fetch(`${apiUrl}/api/room/${roomId}`, {
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
    // Update workingEmpData with roomNumber for the corresponding working employee
    setWorkingEmpData(prevWorkingEmpData => {
      return prevWorkingEmpData.map(workingEmp => {
        if (workingEmp._id === workingEmpId) {
          return { ...workingEmp, roomNumber: data.roomNumber };
        }
        return workingEmp;
      });
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
};


const handleDelete = async (workingEmpId) => {
  try {
    const response = await fetch(`${apiUrl}/api/hosteluser/${workingEmpId}`, {
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
    console.log("Deleted Hostel User Successfully");
    handleWorkingEmpData();
  } catch (error) {
    // Catch and log any errors that occur during the fetch or if the response is not ok.
    console.error("Error during deletion:", error.message);
  }
};


const handleDeletePhoto = async () => {
  if (!selectedUser) return;

  try {
    const response = await fetch(`${apiUrl}/api/hosteluser/${selectedUser._id}/deletephoto`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });



    if (!response.ok) {
      throw new Error('Failed to delete profile photo');
    }

    // Update selected user to remove profile photo locally
    setSelectedUser(prevUser => ({
      ...prevUser,
      profilePhoto: null // Assuming your UI can handle null profile photo gracefully
    }));
    setWorkingEmpData(prevData => {
      return prevData.map(workingEmp => {
        if (workingEmp._id === selectedUser._id) {
          return { ...workingEmp, profilePhoto: null };
        }
        return workingEmp;
      });
    });
    closeModal(); // Close the modal on success

  } catch (error) {
    console.error("Error deleting profile photo:", error.message);
  }
};



  return (
    <>
      <div className="row">
        <div className="col-lg-12 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex flex-wrap justify-content-between">
                    <h4 className="card-title mb-3">Working Employee List</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center justify-content-md-end">
                    <input type="text" placeholder="search Employee" />{" "}
                    <button className=" btn-outline-secondary">search</button>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                      <th>Mobile</th>
                      <th>Room</th>
                      <th>Billing Date</th>
                      <th>Fee Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {workingEmpData?.length>0 && workingEmpData?.map((workingEmp)=>(
                    <tr key={workingEmp._id}>
                      <td>
                        <div className="d-flex">
                        <div className={`user-info-item ${!workingEmp.profilePhoto ? 'no-photo' : ''}`}>
                {workingEmp.profilePhoto ? (
                    <>
                        <img
                            className="img-sm rounded-circle mb-md-0 mr-2"
                            src={`${apiUrl}/images/${workingEmp.profilePhoto}`}
                            alt="Profile Photo"
                            onClick={() => openModal(workingEmp)}
                            style={{ cursor: 'pointer' }}
                        />
                    </>
                ) : (
                    <div className="" style={{ color: 'grey', fontSize: '50px' }}>
                        <AccountCircleRoundedIcon style={{ fontSize: 'inherit' }} />
                    </div>
                )}
            </div>
            <Modal
                open={isModalOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button onClick={closeModal} className="btn btn-sm border mb-2" style={{ float: 'right' }}><CloseIcon/></button>
                    {workingEmp.profilePhoto && (
        <button className="btn btn-sm border mb-2" onClick={handleDeletePhoto}>
            <DeleteIcon />
        </button>
    )}
                    {workingEmp.profilePhoto && (
                        <img
                            src={`${apiUrl}/images/${workingEmp.profilePhoto}`}
                            alt="Profile Photo"
                            style={{ width: '100%' }}
                        />
                    )}
                </Box>
            </Modal>
                        </div>
                      </td>
                      <td>
                        <div className=" mt-1">{workingEmp.userReferenceId}</div>
                      </td>
                      <td>
                      <div className="  mt-1">{workingEmp.name} </div>

                      </td>
                      <td>
                        <div className="  mt-1">{workingEmp.mobile} </div>
                      </td>
                      <td>
                        <div className=" mt-1">{workingEmp.roomNumber}</div>
                      </td>
                      
                      <td>
                        <div className=" mt-1">28th Jan</div>
                      </td>
                      <td>
                        <div className=" text-success  mt-1">Pending</div>
                      </td>
                      <td>
                        <div className="font-weight-bold  mt-1">
                        <button className="btn btn-sm border mr-2" onClick={handleDeleteOpen}><DeleteIcon/></button>

                          <button
                            type="button"
                            className="btn btn-sm border"
                            onClick={() => handleEditAction(workingEmp)}>
                            <EditIcon/>
                          </button>
                          <button  className="btn btn-sm border ml-2" onClick={() => handleViewAction(workingEmp)}><VisibilityIcon/></button>
                        </div>
                        <Modal
    open={deleteOpen}
    onClose={handleDeleteClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={deleteModalStyle}>
      <Typography variant="h6" component="h2" gutterBottom>
        Delete Hostel User?
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 2 }}>
      <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(workingEmp._id)}
          startIcon={<DeleteIcon />}
          sx={{ mr: 1 }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDeleteClose}
          startIcon={<CloseIcon />}
         
        >
          Cancel
        </Button>
       
      </Box>
    </Box>
  </Modal>
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

export default WorkingEmp;
