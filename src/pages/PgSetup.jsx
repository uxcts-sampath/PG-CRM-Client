import React,{useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField,InputLabel,Button } from "@mui/material";
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




  const Pgsetup = () => {
  const [floorNumber, setFloorNumber] = useState("");
  const [commonWashroomCount, setCommonWashroomCount] = useState("");
  const [floorName,setFloorName]=useState("");
  const [floors,setFloors]=useState([]);
  const [floorId,setFloorId]=useState("")

  const [floorOpen, setFloorOpen] = React.useState(false);
  const handleFloorOpen = () => setFloorOpen(true);
  const handleFloorClose = () => setFloorOpen(false);

  const [roomOpen, setRoomOpen] = React.useState(false);
  
  const handleRoomOpen = (floorId) => {
    setRoomOpen(true);
    setFloorId(floorId);
  };
 
 
  const handleRoomClose = () => setRoomOpen(false);

  const [roomType, setRoomType] = useState("single");
  const [roomNumber, setRoomNumber] = useState("");  
  
  
  const [numberOfBeds, setNumberOfBeds] = useState("");
  const [attachedWashroom, setAttachedWashroom] = useState(false);
  const [shelfChecked, setShelfChecked] = useState(false);


  const token = sessionStorage.getItem("token")
  const userId = sessionStorage.getItem("userId")

 
  
// Creating POST method for Add Floor
const handleSubmit = async () => {
 
  const formData = {
    userId: `${userId}`,
    floorName,
    floorNumber,
    commonWashroomCount,
  };

  try {
    const response = await fetch("/api/floor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
  

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await response.json();
    console.log('Success:', data);
    
    handleFloorClose();
    setFloors(prevFloors => [...prevFloors, data]);
  } catch (error) {
    console.error('Error:', error);
  }
};


  const handleToggleChange = ()=>{
    setAttachedWashroom((prev) => !prev);
  }
  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };
  
  const handleShelfChange=()=>{
    setShelfChecked((prev) => !prev);
  }

 

  // Creating POST method for Add Room
  const handleRoomCreate = async () => {
    const formData = {
      floorId: `${floorId}`, // Assuming floorId is correctly defined
      roomData: [{  // Sending roomData as an array with a single object
        roomNumber: roomNumber,
        type: roomType, 
        commonWashroom: attachedWashroom ? 'Yes' : 'No',
        numberOfBeds: numberOfBeds,
        beds: []
      }]
    };
  
    try {
      const response = await fetch('/api/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      handleRoomClose();
      
      floorData();

    } catch (error) {
      console.error('Error:', error);
    }
  };
  


  // Getting Floor Data
  const floorData = () => {
    fetch("/api/floors", {
      method: 'GET', 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch floor data');
      }
      return response.json();
    })
    .then(data => {
      setFloors(data);      
    })
    .catch(error => console.error('Error fetching floor data:', error));
  };
  

  const handleFloorDelete = async (floorId) => {
    try {
      const response = await fetch(`/api/floor/${floorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
 
      if (!response.ok) {
        throw new Error('Failed to delete floor');
      }
  
      console.log('Floor deleted successfully');
      // Optionally, you can perform additional actions after successful deletion
    } catch (error) {
      console.error('Error deleting floor:', error.message);
      // Handle error appropriately, such as showing a notification to the user
    }
  };
  

  
useEffect(()=>{
  floorData()
},[])




  
  
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h2 className="mb-0">Setup</h2>
          <p>Create your floors and add rooms </p>
        </div>

       
        <div className="col-sm-6">
          <div className="d-flex align-items-center justify-content-md-end">
            
            <div className="pr-1 mb-3 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm btn-primary btn-icon-text border" onClick={handleFloorOpen}>
                <i className="typcn typcn-plus mr-2"></i>Create Floor
              </button>

          {/* Creating Modal for Create Floor */}

      <div>
      <Modal
        open={floorOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" >
        <Box className="pgsetup-modal">
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className="modal-top">
            <Typography>Add Floor</Typography>
          <Typography style={{cursor:'pointer'}} onClick={handleFloorClose}><ClearIcon/></Typography>
          </div>
          <Box  style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
      {/* Label and Input field for floor */}
      <InputLabel htmlFor="floorName">Floor Name</InputLabel>
      <TextField id=" floorName" name=" floorName"  variant="outlined"  
          onChange={(e) => setFloorName(e.target.value)}/>
          </Box>

          <Box  style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
      {/* Label and Input field for floor */}
      <InputLabel htmlFor="floorNumber">Floor Number</InputLabel>
      <TextField id="floorNumber" name="floorNumber"  variant="outlined" 
          onChange={(e) => setFloorNumber(e.target.value)} />
          </Box>

          <Box  style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
      {/* Label and Input field for floor */}
      <InputLabel htmlFor=" commonWashroomCount">Common Wash rooms</InputLabel>
      <TextField id=" commonWashroomCount" name=" commonWashroomCount"  variant="outlined"  
          onChange={(e) => setCommonWashroomCount(e.target.value)}/>
          </Box>

    <Box style={{ display: 'flex',justifyContent:'end', marginTop: '20px' }}>
      {/* Submit Button */}
      <Button   variant="outlined" color="secondary" onClick={handleFloorClose} style={{marginRight:'27px'}}> Cancel</Button>
      {/* Cancel Button */}
      <Button variant="contained"  color="secondary" onClick={handleSubmit} >Create</Button>
    </Box>
   
        </Box>
      </Modal>
    </div>
            </div>
          </div>
        </div>
      </div>

      {floors?.length>0 && floors?.map((val)=>{
     
       
      return( 
         
      <div  className="row bgfloor p-3 mt-3">
    
          <div  className="col-xl-6">
          <h4 className="mb-0">Floor Name : {val.floorName} </h4>
         </div>
       
      
        <div className="col-xl-6">
          <div className="d-flex align-items-center justify-content-md-end">
            <div className="pr-1 mb-3 mr-2 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm bg-white btn-icon-text border"
                onClick={() => handleFloorDelete(val._id)}>
                <i className="typcn typcn-trash mr-2"></i>
                Delete Floor
              </button>
            </div>
            <div className="pr-1 mb-3 mb-xl-0">
              <button type="button" className="btn btn-sm btn-primary btn-icon-text border" onClick={() => handleRoomOpen(val._id)}>
                <i className="typcn typcn-plus mr-2"></i>Add Room
              </button>

{/* Creating Modal for Room */}

<div>
  <Modal
    open={roomOpen}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box className="pgsetup-modal">
      <div style={{ display: 'flex', justifyContent: 'space-between' }} className="modal-top">
        <Typography>Add Room</Typography>
        <Typography style={{ cursor: 'pointer' }} onClick={handleRoomClose}><ClearIcon /></Typography>
      </div>

      {/* Attached Washroom */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <InputLabel htmlFor="attachedWashRoom">Attached Washroom</InputLabel>
        <Switch checked={attachedWashroom} onChange={handleToggleChange} inputProps={{ 'aria-label': 'controlled' }} color="secondary" />
      </Box>

      {/* Room Type */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <InputLabel htmlFor="roomType">Room Type</InputLabel>
        <FormControl style={{ width: '40%' }}>
          <InputLabel id="demo-simple-select-label">Room Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roomType}
            label="Room Type"
            onChange={handleRoomTypeChange}
          >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="shared">Shared</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Room Number */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <InputLabel htmlFor="roomNumber">Room Number</InputLabel>
        <TextField id="roomNumber" name="roomnumber" variant="outlined" onChange={(e) => setRoomNumber(e.target.value)} />
      </Box>

      {/* Shelf */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <InputLabel htmlFor="shelf">Shelf</InputLabel>
        <Switch checked={shelfChecked} onChange={handleShelfChange} inputProps={{ 'aria-label': 'controlled' }} color="secondary" />
      </Box>

      {/* Number of Beds */}
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        <InputLabel htmlFor="numberOfBeds">No. of beds</InputLabel>
        <TextField id="numberOfBeds" name="numberOfBeds" variant="outlined" onChange={(e) => setNumberOfBeds(e.target.value)} />
      </Box>

      {/* Buttons */}
      <Box style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
        <Button variant="outlined" color="secondary" onClick={handleRoomClose} style={{ marginRight: '27px' }}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleRoomCreate}>Create</Button>
      </Box>

    </Box>
  </Modal>
</div>



{/* Room Creating Modal ends */}

            </div>
          </div>
        </div>
        

        {val.rooms.map(room => (
          <div className="col-xl-2 d-flex stretch-card mb-2">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row b-l-share">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">
                      <i className=" typcn typcn-group mr-2"></i> #{room.roomNumber}
                    </h5>
                  </div>
              <div className="col-lg-12">Total Beds - <input type="number" className="room-count-input" 
                        value={room.numberOfBeds}/>
              </div>

                </div>
              </div>
            </div>
          </div>
        </div>
 ))}

      </div>)})}
      


    </>
  );
};

export default Pgsetup;
