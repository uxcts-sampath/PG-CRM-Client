import React,{useState,useEffect} from 'react';


import Grid from '@mui/material/Grid';
import {  useNavigate,useLocation  } from "react-router-dom";
import { TextField,InputLabel,Button,Paper } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 
const AddUsers=()=> {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const [floors, setFloors] = useState([]);
  const [rooms,setRooms]=useState([])
  const [beds,setBeds]=useState([])

  
  

  
  

  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    fatherName: '',
    mobile: '',
    age: '',
    referredBy: '',
    aadharNumber: '',
    purposeFor: '',
    uploadAadhar: null,
    addressProof: null,
    address: '',
    residenceCity: '',
    state: '',
    profilePhoto: null,
    referenceMobile: '',
    requireRoomType: 'single',
    floor: '', // Default value for floor
    room: '', // Default value for room
    bed: '',
    billingCycle: 'monthly',
    billingDate: '',
    amount: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'requireRoomType') {
      // Handle room type change
      // Update form data with selected room type
      setFormData(prevState => ({ ...prevState, [name]: value }));
      // Handle room type specific logic
      if (value === 'single') {
        // If single room type selected, show only single bed rooms
        const singleBedRooms = floors.flatMap(floor => floor.rooms.filter(room => room.type === 'single'));
        setRooms(singleBedRooms);
      } else if (value === 'shared') {
        // If shared room type selected, show rooms with more than one bed
        const sharedBedRooms = floors.flatMap(floor => floor.rooms.filter(room => room.type === 'shared'));
        setRooms(sharedBedRooms);
      }
      // Clear room and bed selections
      setFormData(prevState => ({ ...prevState, floor: '', room: '', bed: '' }));
    } else if (name === 'floor') {
      // Handle floor selection
      // Update form data with selected floor
      setFormData(prevState => ({ ...prevState, [name]: value }));
    } else if (name === 'room') {
      // Handle room selection
      // Update form data with selected room
      setFormData(prevState => ({ ...prevState, [name]: value }));
      // Find the selected room
      const selectedRoom = rooms.find(room => room._id === value);
      // Filter out occupied beds from selected room
      const notOccupiedBeds = selectedRoom ? selectedRoom.beds.filter(bed => bed.status !== 'occupied') : [];
      setBeds(notOccupiedBeds);
    } else if (name === 'bed') {
      // Handle bed selection
      // Update form data with selected bed
      setFormData(prevState => ({ ...prevState, [name]: value }));
    } else {
      // Handle other form field changes
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };
  
  


  useEffect(() => {
    console.log('Location state:', location.state);
    if (location.state && location.state.user) {
      const userDataFromLocation = location.state.user;
      // Ensure you're setting all form fields correctly here
      setFormData({
        userId:userDataFromLocation._id,
        userType: userDataFromLocation.userType,
        name: userDataFromLocation.name,
        fatherName: userDataFromLocation.fatherName,
        mobile: userDataFromLocation.mobile,
        age: userDataFromLocation.age,
        referredBy: userDataFromLocation.referredBy,
        aadharNumber: userDataFromLocation.aadharNumber,
        purposeFor: userDataFromLocation.purposeFor,
        address: userDataFromLocation.address,
        residenceCity: userDataFromLocation.residenceCity,
        state: userDataFromLocation.state,
        requireRoomType: userDataFromLocation.requireRoomType,
        floor: userDataFromLocation.floor,
        room: userDataFromLocation.room,
        bed: userDataFromLocation.bed,
        billingCycle: userDataFromLocation.billingCycle,
        billingDate: userDataFromLocation.billingDate,
        amount: userDataFromLocation.amount,
      });
    }
  }, [location.state]);
  
  
console.log('dsfds',formData)
  

  
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    // Construct the payload with updated user data
    const formattedData = {
      // Include user ID
      userId: formData.userId,
      userType: formData.userType,
      name: formData.name,
      fatherName: formData.fatherName,
      mobile: formData.mobile,
      age: parseInt(formData.age),
      referredBy: formData.referredBy,
      aadharNumber: formData.aadharNumber,
      purposeFor: formData.purposeFor,
      address: formData.address,
      residenceCity: formData.residenceCity,
      state: formData.state,
      requireRoomType: formData.requireRoomType,
      floor: formData.floor,
      room: formData.room,
      bed: parseInt(formData.bed),
      billingCycle: formData.billingCycle,
      billingDate: formData.billingDate,
      amount: parseInt(formData.amount),
    };

    let url = '/api/createhosteluser';
    let method = 'POST';

    if (location.state && location.state.user) {
      // If user data is available, it's an update operation
      url = `/api/updatehosteluser/${formData.userId}`;
      method = 'PUT';
    }

    // Check if the bed is already occupied before updating
    if (method === 'PUT') {
      const selectedRoom = floors.find(floor => floor._id === formData.floor)?.rooms.find(room => room._id === formData.room);
      const selectedBed = selectedRoom?.beds.find(bed => bed.bedNumber === formData.bed);
      if (selectedBed && selectedBed.status === 'occupied') {
        alert('The selected bed is already occupied. Please choose another bed.');
        return;
      }
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formattedData),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to submit form');
    }

    console.log('Success:', responseData);
    navigate('/home/pgusers'); // Navigate to the desired page on success
  } catch (error) {
    console.error('Error sending data:', error.message);
    alert('An error occurred while submitting the form. Please try again.');
  }
};

const hostelUser=formData.userId
  sessionStorage.setItem('hostelUser',hostelUser)
  
  

  const floorData = () => {
    fetch('/api/floors', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch floor data');
        }
        return response.json();
      })
      .then((data) => {
        setFloors(data);
      })
      .catch((error) => console.error('Error fetching floor data:', error));
  };

 
  useEffect(() => {
    floorData();
  }, []);


  

    
return(
    <>
     <div className="row">
        <div className="col-sm-6">
          <h2 className="mb-0">Add User</h2>
        </div>
    </div>

   <form >
   <div className="row  mt-3">
        <div className="col-xl-12 d-flex grid-margin stretch-card">
        <div className="card">
            <div className="card-body">
            <Grid container spacing={6}>

            <Grid item xs={12} sm={6}>
  <Select
    id="userType"
    name="userType"
    label="User Type"
    variant="standard"
    fullWidth
    required
    defaultValue="select type"
    value={formData.userType || "select type"} // Use formData.userType if it exists, otherwise fallback to "select type"
    onChange={handleChange}
  >
    <MenuItem value="select type" disabled>Select User Type</MenuItem>
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="working emp">Working Employee</MenuItem>
    <MenuItem value="guest">Guest</MenuItem>
  </Select>
</Grid>


    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="name"
        name="name"
        label="Enter Name"
        fullWidth
        autoComplete="given-name"
        variant="standard"
        value={formData.name}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="fatherName"
        name="fatherName"
        label="Father name"
        fullWidth
        autoComplete="father-name"
        variant="standard"
        value={formData.fatherName}
        onChange={handleChange}
      />
    </Grid>
    <Grid item  xs={12} sm={6}>
      <TextField
        required
        id="mobile"
        name="mobile"
        label="Mobile Number"
        fullWidth
        autoComplete="mobile-number"
        variant="standard"
        value={formData.mobile}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="age"
        name="age"
        label="Age"
        fullWidth
        autoComplete="age"
        variant="standard"
        value={formData.age}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
            id="referredBy"
            name="referredBy"
            label="Referred By"
            fullWidth
            autoComplete="referred-by"
            variant="standard"
            value={formData.referredBy}
            onChange={handleChange}
          />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="aadharNumber"
        name="aadharNumber"
        label="Aadhar Number"
        fullWidth
        variant="standard"
        value={formData.aadharNumber}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="purposeFor"
        name="purposeFor"
        label="Purpose For"
        fullWidth
        autoComplete="purpose-for"
        variant="standard"
        value={formData.purposeFor}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
            type="file"
            id="uploadAadhar"
            name="uploadAadhar"
            label="Upload Aadhar"
            fullWidth
            autoComplete="upload-aadhar"
            variant="standard"
            value={formData.uploadAadhar}
            onChange={handleChange}
          />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
            type="file"
            id="addressProof"
            name="addressProof"
            label="Address Proof"
            fullWidth
            autoComplete="address-proof"
            variant="standard"
            value={formData.addressProof}
            onChange={handleChange}
          />
    </Grid>
    <Grid item xs={12} >
      <TextField
        required
        id="address"
        name="address"
        label="Address"
        fullWidth
        autoComplete="address"
        variant="standard"
        value={formData.address}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="residenceCity"
        name="residenceCity"
        label="Residence City"
        fullWidth
        autoComplete="residence-city"
        variant="standard"
        value={formData.residenceCity}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="state"
        name="state"
        label="State"
        fullWidth
        autoComplete="state"
        variant="standard"
        value={formData.state}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            label="Profile Photo"
            fullWidth
            autoComplete="profile-photo"
            variant="standard"
            value={formData.profilePhoto}
            onChange={handleChange}
          />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="referenceMobile"
        name="referenceMobile"
        label="Reference Mobile Number"
        fullWidth
        autoComplete="reference-mobile-number"
        variant="standard"
        value={formData.referenceMobile}
        onChange={handleChange}
      />
    </Grid>
    
    <Grid item xs={12} sm={6}>
  <Select
    id="requireRoomType"
    name="requireRoomType"
    label="Required Room Type"
    variant="standard"
    fullWidth
    required
    defaultValue="select type"
    onChange={handleChange}
  >
    <MenuItem value="select type" disabled>Select Bed Type</MenuItem>
    <MenuItem value="single">Single</MenuItem>
    <MenuItem value="shared">Shared</MenuItem>
  </Select>
</Grid>




     
      
       
  <Grid item xs={12} sm={2}>
    <FormControl variant="standard" fullWidth required>
   
      <InputLabel htmlFor="floor">Floor</InputLabel>
      <Select
  id="floor"
  name="floor"
  label="Floor"
  variant="standard"
  fullWidth
  required
  value={formData.floor} // Set value prop to formData.floor
  onChange={handleChange}
>
  {floors?.length > 0 && floors?.map((floor) => (
    <MenuItem key={floor._id} value={floor._id}>{floor.floorName}</MenuItem>
  ))}
</Select>

     
    </FormControl>
  </Grid>

  <Grid item xs={12} sm={2}>
    <FormControl variant="standard" fullWidth required>
      <InputLabel htmlFor="room">Room</InputLabel>
      <Select
  id="room"
  name="room"
  label="Room"
  variant="standard"
  fullWidth
  required
  value={formData.room} // Set value prop to formData.room
  onChange={handleChange}
>
  {rooms?.length > 0 && rooms?.map((room) => (
    <MenuItem key={room._id} value={room._id}>{room.roomNumber}</MenuItem>
  ))}
</Select>

    </FormControl>
  </Grid>

  <Grid item xs={12} sm={2}>
    <FormControl variant="standard" fullWidth required>
      <InputLabel htmlFor="bed">Bed</InputLabel>
      <Select
        name="bed"
        value={formData.bed}
        onChange={handleChange}
      >
        {beds?.length > 0 && beds?.map((bed) => (
          <MenuItem key={bed.bedNumber} value={bed.bedNumber}>{bed.bedNumber}</MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>










    <Grid item xs={12} sm={6}>
          <Select
            id="billingCycle"
            name="billingCycle"
            label="Billing Cycle"
            variant="standard"
            fullWidth
            required
            defaultValue="billing"
            value={formData.billingCycle}
            onChange={handleChange}
          >
             <MenuItem value="billing" disabled>Select Billing Type</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
          required
          id="billingDate"
          name="billingDate"
          label="Billing date"
          fullWidth
          autoComplete="billing-date"
          variant="standard"
          value={formData.billingDate}
          onChange={handleChange}/>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="amount"
        name="amount"
        label="Amount"
        fullWidth
        autoComplete="amount"
        variant="standard"
        value={formData.amount}
        onChange={handleChange}
      />
    </Grid>
</Grid>
                </div>
                </div>
    </div>
    </div>
    <div className="row">
        <div className='col-12 mb-5'>
          <div className="d-flex align-items-center justify-content-md-end">
        <Button variant="outlined" color="secondary"  className='mr-3'>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>Create</Button>
        </div>
        </div>
    </div>
   </form>

  
    </>
)
}

export default AddUsers;

