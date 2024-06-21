import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import userprofileImage from "/theme/images/faces/face29.png";

const Guests = () => {

  const token = sessionStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [guestData, setGuestData] = useState([]);
  const [roomDetailsFetched, setRoomDetailsFetched] = useState(false);
  const navigate = useNavigate();
  const [userOpen, setUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserOpen = () => setUserOpen(true);
  const handleUserClose = () => setUserOpen(false);

  const handleEditAction = (guest) => {
    navigate('addusers', { state: { user: guest } });
  };

  const handleViewAction = (guest) => {
    setSelectedUser(guest);
    handleUserOpen();
  };
  

  const handleGuestsData = () => {
    fetch(`${apiUrl}/api/guests`, {
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
      setGuestData(data);
      setRoomDetailsFetched(false); // Reset roomDetailsFetched state
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  useEffect(() => {
    handleGuestsData();
  }, []);

  useEffect(() => {
    if (guestData.length > 0 && !roomDetailsFetched) {
      guestData.forEach(guest => {
        fetchRoomDetails(guest.room, guest._id);
      });
      setRoomDetailsFetched(true); // Mark room details as fetched
    }
  }, [guestData, roomDetailsFetched]);

  const fetchRoomDetails = (roomId, guestId) => {
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
      setGuestData(prevGuestData => {
        return prevGuestData.map(guest => {
          if (guest._id === guestId) {
            return { ...guest, roomNumber: data.roomNumber };
          }
          return guest;
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleDelete = async (guestId) => {
    try {
      const response = await fetch(`${apiUrl}/api/hosteluser/${guestId}`, {
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
      handleGuestsData();
    } catch (error) {
      // Catch and log any errors that occur during the fetch or if the response is not ok.
      console.error("Error during deletion:", error.message);
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
                    <h4 className="card-title mb-3">Guests List</h4>
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
                      <th>Guest ID</th>
                      <th>Billing Date</th>
                      <th>Fee Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

            {guestData?.length>0 && guestData?.map((guest)=>(
                    <tr key={guest._id}>
                      <td>
                        <div className="d-flex">
                          <img
                            className="img-sm rounded-circle mb-md-0 mr-2"
                            src={`${apiUrl}/images/${guest.profilePhoto}`}
                            alt="profile image"
                          />
                          <div>
                            <div className=" mt-2">{guest.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="  mt-1">{guest.mobile} </div>
                      </td>

                      <td>
                        <div className=" mt-1">{guest.purposeFor} </div>
                      </td>

                      <td>
                        <div className=" mt-1">{guest.city} </div>
                      </td>

                      <td>
                        <div className=" mt-1">{guest.state}</div>
                      </td>
                      <td>
                        <div className=" mt-1">{guest.roomNumber} </div>
                      </td>
                      <td>
                        <div className=" mt-1">{guest.userReferenceId}</div>
                      </td>
                      <td>
                        <div className=" mt-1">28th Jan</div>
                      </td>
                      <td>
                        <div className=" text-success  mt-1">Pending</div>
                      </td>
                      <td>
                        <div className="font-weight-bold  mt-1">
                          <button
                            type="button"
                            className="btn btn-sm border"
                            onClick={() => handleEditAction(guest)}
                          >
                           <EditIcon/>
                          </button>
                          <button  className="btn btn-sm border ml-2" onClick={() => handleViewAction(guest)}><VisibilityIcon/></button>
                          <button className="btn btn-sm border ml-2" onClick={()=>handleDelete(guest._id)}><DeleteIcon/></button>
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

export default Guests;
