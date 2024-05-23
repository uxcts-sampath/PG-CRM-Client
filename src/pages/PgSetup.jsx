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
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

 



  const Pgsetup = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
  const [floorNumber, setFloorNumber] = useState("");
  const [commonWashroomCount, setCommonWashroomCount] = useState("");
  const [floorName,setFloorName]=useState("");
  const [floors,setFloors]=useState([]);
  const [floorId,setFloorId]=useState("")
  const [roomId,setRoomId]= useState("")
  const [bedType, setBedType] = useState('single'); 
  const [singleBedPrice, setSingleBedPrice] = useState(0); 
  const [sharedBedPrice, setSharedBedPrice] = useState(0); 
  const [floorOpen, setFloorOpen] = React.useState(false);
  const handleFloorOpen = () => setFloorOpen(true);
  const handleFloorClose = () => setFloorOpen(false);

  const [roomOpen, setRoomOpen] = React.useState(false);
  
  const handleRoomOpen = (floorId) => { 
    setRoomOpen(true);
    setFloorId(floorId);
    setRoomId(roomId)
  };

 
  const handleRoomClose = () => setRoomOpen(false);

  const [priceOpen,setPriceOpen]=useState(false);
  const handlePriceOpen = async () => {
    // Fetch existing price data here if needed
    
    // Set singleBedPrice and sharedBedPrice with existing values
    if (priceData.length > 0) {
      setSingleBedPrice(priceData[0].singleBedPrice);
      setSharedBedPrice(priceData[0].sharingBedPrice);
    }
  
    // Open the modal
    setPriceOpen(true);
  };
  
  const handlePriceClose=()=>setPriceOpen(false);

  const [roomType, setRoomType] = useState("single");
  const [roomNumber, setRoomNumber] = useState("");  
  
  
  const [numberOfBeds, setNumberOfBeds] = useState("");
  const [attachedWashroom, setAttachedWashroom] = useState(false);
  const [shelfChecked, setShelfChecked] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const [priceData,setPriceData]=useState([])


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
    const response = await fetch(`${apiUrl}/api/floor`, {
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

    floorData();

    setFloors(prevFloors => [...prevFloors, data]);
  } catch (error) {
    console.error('Error:', error);
  }
};


  const handleToggleChange = ()=>{
    setAttachedWashroom((prev) => !prev);
  }

  const handleRoomTypeChange = (event) => {
    const selectedRoomType = event.target.value;
  
    // Set the room type
    setRoomType(selectedRoomType);
    if (selectedRoomType === "single") {
      setNumberOfBeds(1); // Set default number of beds to 1
    }
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
      const response = await fetch(`${apiUrl}/api/room`, {
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
    fetch(`${apiUrl}/api/floors`, {
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
      console.log(data)   
    })
    .catch(error => console.error('Error fetching floor data:', error));
  };
 

  
  // Update handleFloorDelete function in Pgsetup component
const handleFloorDelete = async (floorId) => {
  try {
    const response = await fetch(`${apiUrl}/api/floors/${floorId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json();
        console.error('Error deleting floor:', data.message);
        alert(data.message); // Show an alert with the error message
      } else {
        throw new Error('Failed to delete floor');
      }
    } else {
      console.log('Floor deleted successfully');
      // Fetch floors again to update the UI after deletion
      floorData();
    }
  } catch (error) {
    console.error('Error deleting floor:', error.message);
    // Handle other errors, such as network issues
  }
  
};



const handleBedTypeChange = (event) => {
  setBedType(event.target.value);
};

  



// Define an asynchronous function to handle room deletion
const handleRoomDelete = async (roomId) => {
  try {
    const response = await fetch(`${apiUrl}/api/room/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete room');
    }

    console.log('Room deleted successfully');
    // Fetch floors again to update the UI after deletion
    floorData();

  } catch (error) {
    console.error('Error deleting room:', error.message);
    // Handle error appropriately, such as showing a notification to the user
  }
};

const handleSubmitPrice = async () => {
  try {
    let formData = {
      userId: `${userId}`,
      singleBedPrice: singleBedPrice,
      sharingBedPrice: sharedBedPrice,
    };

    let endpoint = '';
    let method = '';

    // Determine whether to perform POST or PUT based on hasPosted state
    if (hasPosted) {
      endpoint = `${apiUrl}/api/updateprice/${userId}`;
      method = 'PUT';
    } else {
      endpoint = `${apiUrl}/api/createprice`;
      method = 'POST';
    }

    // Make API call to createPrice or updatePrice API
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update price');
    }

    console.log('Price updated successfully');

    handlePriceGet()

    // Set hasPosted to true after successful POST
    if (!hasPosted) {
      setHasPosted(true);
    }

    handlePriceClose();
    // Reset input fields or perform any other necessary actions after successful update
  } catch (error) {
    console.error('Error:', error);
    // Handle error appropriately, such as showing a notification to the user
  }
};




const handlePriceGet = () => {
  fetch(`${apiUrl}/api/getprice`, {
    method: 'GET', 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` 
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch price data');
    }
    return response.json();
  })
  .then(data => {
  
    setPriceData(data);
    
    // Check if price data exists and update hasPosted accordingly
    if (data.length > 0) {
      setHasPosted(true);
    }
  })
  .catch(error => {
    console.error('Error fetching price data:', error);
    // Handle error appropriately
  });
};



   
useEffect(()=>{
  floorData()
  handlePriceGet()
},[])

 
  
  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h2 className="mb-0">Setup</h2>
          <p>Create your floors and add rooms </p>
        </div>

       
        <div className="col-sm-6">
       
          <div className="d-flex justify-content-between align-items-center ">

            {/* {priceData?.length>0 && priceData?.map((val)=>(
          <div className="bg-light p-2">
  <span>Single : {val.singleBedPrice}</span> 
  <span className="ml-4">Shared : {val.sharingBedPrice} </span>
  {hasPosted ? (
    <button className="ml-4 border-0 bg-none" onClick={handlePriceOpen}><ModeEditIcon/> </button>
  ) : (
    <button className="ml-4 border-0 bg-none" onClick={handlePriceOpen}> <i className="typcn typcn-plus mr-2"></i></button>
  )}
</div>
 ))} */}


 



          <div className="bg-light p-2 d-flex align-items-center ">
          {priceData?.length>0 && priceData?.map((val)=>(
  <div>
  <span>Single :{val.singleBedPrice}</span> 
  <span className="ml-4">Shared :{val.sharingBedPrice}</span>
  </div>
  ))}
  {hasPosted ? (
    <button className="ml-4 border-0 bg-none" onClick={handlePriceOpen}><ModeEditIcon/> </button>
  ) : (
    <button className="ml-4 border-0 bg-none" onClick={handlePriceOpen}>Add Bed Price <i className="typcn typcn-plus mr-2"></i></button>
  )}
</div>



            
            
            <div className="pr-1 mb-3 mb-xl-0">
              
              <button
                type="button"
                className="btn btn-sm btn-primary btn-icon-text border" onClick={handleFloorOpen}>
                <i className="typcn typcn-plus mr-2"></i>Create Floor
              </button>

              </div>
        </div>
      </div>


    {/* Creating Price for Bed */}
      <div>

      <Modal
  open={priceOpen}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box className="pgsetup-modal">
    <div style={{ display: 'flex', justifyContent: 'space-between' }} className="modal-top">
      <Typography>{hasPosted ? 'Edit Price' : 'Add Price'}</Typography>
      <Typography style={{ cursor: 'pointer' }} onClick={handlePriceClose}><ClearIcon /></Typography>
    </div>

    {/* Input field for Single Bed Price */}
    <TextField
      fullWidth
      id="single-bed-price"
      label="Single Bed Price"
      variant="outlined"
      value={singleBedPrice}
      onChange={(e) => setSingleBedPrice(e.target.value)}
      style={{ marginTop: '20px' }}
    />

    {/* Input field for Shared Bed Price */}
    <TextField
      fullWidth
      id="shared-bed-price"
      label="Shared Bed Price"
      variant="outlined"
      value={sharedBedPrice}
      onChange={(e) => setSharedBedPrice(e.target.value)}
      style={{ marginTop: '20px' }}
    />

    {/* Submit or Update button */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmitPrice}
      style={{ marginTop: '20px' }}
    >
      {hasPosted ? 'Update Price' : 'Submit'}
    </Button>
  </Box>
</Modal>






      </div>

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
          {/* <Box  style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
      <InputLabel htmlFor="floorName">Floor Name</InputLabel>
      <TextField id=" floorName" name=" floorName"  variant="outlined"  
          onChange={(e) => setFloorName(e.target.value)}/>
          </Box> */}

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
      
            {floors && floors.map((val) => (
    <div key={val._id}>
{val.floors && val.floors.map((floorData) => (
        <div key={floorData._id} className="row bgfloor p-3 mt-3">
        <div  className="col-xl-6">
          <h4 className="mb-0">Floor Number : {floorData.floorNumber} </h4>
         </div>
         <div className="col-xl-6">
         <div className="d-flex align-items-center justify-content-md-end">
         <div className="pr-1 mb-3 mr-2 mb-xl-0">
                <button
                  type="button"
                  className="btn btn-sm bg-white btn-icon-text border"
                  onClick={() => handleFloorDelete(floorData._id)}> {/* Pass floor ID to handleFloorDelete */}
                  <i className="typcn typcn-trash mr-2"></i>
                  Delete Floor
                </button>
            </div>
            <div className="pr-1 mb-3 mb-xl-0">
            <button type="button" className="btn btn-sm btn-primary btn-icon-text border" onClick={() => handleRoomOpen(floorData._id)}>
                <i className="typcn typcn-plus mr-2"></i>Add Room
              </button>
        </div>
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
     {roomType === "shared" && (
  <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
    <InputLabel htmlFor="numberOfBeds">No. of beds</InputLabel>
    <TextField id="numberOfBeds" name="numberOfBeds" variant="outlined" onChange={(e) => setNumberOfBeds(e.target.value)} />
  </Box>
)}
      {/* Buttons */}
      <Box style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
        <Button variant="outlined" color="secondary" onClick={handleRoomClose} style={{ marginRight: '27px' }}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleRoomCreate}>Create</Button>
      </Box>

    </Box>
  </Modal>
</div>

          </div>
          </div>
         
          {floorData.rooms && floorData.rooms.map((roomData) => (
             <div className="col-xl-2 d-flex stretch-card mb-2" key={roomData._id}>
             <div className="card">
               <div className="card-body">
                 <div className="d-flex flex-wrap justify-content-between">
                   <div className="row b-l-share ">
                     <div className="close-room">
                     <button onClick={() => handleRoomDelete(roomData._id)}><ClearIcon/></button>
                     </div>
                     <div className="col-lg-12">
                       <h5 className="card-title mb-3">
                         {roomData.type === 'single' ? (
                           <i className="typcn typcn-user mr-2"></i> /* Single icon */
                         ) : (
                           <i className="typcn typcn-group mr-2"></i> /* Shared icon */
                         )}
                         # {roomData.roomNumber}
                       </h5>
                     </div>
                     <div className="col-lg-12">Beds -<span className="room-count-input">{roomData.numberOfBeds}</span>
                     </div>
                     <div className="col-lg-12">
                       {roomData.beds.map(bed => (
                         <span
                         key={bed._id}
                         className={`bed-icon ${bed.status === 'occupied' ? 'occupied' : ''}`}
                       >
                         {/* Render filled circle for occupied bed, otherwise render empty circle */}
                         {bed.status === 'occupied' ? <CircleIcon className="green-circle"/> : <CircleOutlinedIcon/>}
                       </span>
                       ))}
                     </div>          
                   </div>
                 </div>
               </div>
             </div>
           </div>
          ))}
          </div>
          
          
        ))}
       
       </div>
 ))}
    </>
  );
};

export default Pgsetup;
