import React,{useState,useEffect} from 'react';


import Grid from '@mui/material/Grid';
import {  useNavigate,useLocation  } from "react-router-dom";
import { TextField,InputLabel,Button,Paper } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



 
const AddUsers=({ bulkUserData })=> {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  const [floors, setFloors] = useState([]);
  const [rooms,setRooms]=useState([])
  const [beds,setBeds]=useState([])

  const [errors, setErrors] = useState({});
  const [singleBedPrice,setSingleBedPrice]=useState('')
  const [sharingBedPrice,setSharingBedPrice]=useState('')

  const today = new Date().toISOString().slice(0, 10);


  const [profilePhoto,setProfilePhoto]=useState()

  
  
  

  const [formData, setFormData] = useState({
    userType: '',
    name: '',
    gender:'',
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
    billingDate: today,
    paymentType:'',
    amount: '',
    billingAmount:'',
    parentPhoneNumber:'',
    parentEmail:'',
    payment:'cash'
  });


  useEffect(() => {
    // Set form data if bulkUserData is provided
    if (bulkUserData) {
      setFormData({
        ...formData,
        ...bulkUserData,
      });
    }
  }, [bulkUserData]);
 


  const handleChange = (e) => {
    const { name, value } = e.target;
  
   
  
     if (name === 'requireRoomType') {
      // Handle room type change
      if (value === 'single' && floors) {
        const singleBedRooms = floors.flatMap(floor =>
          floor.floors.flatMap(floorData =>
            (floorData.rooms || []).filter(room => room.type === "single")
          )
        );
        setRooms(singleBedRooms);
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          amount: singleBedPrice,
          floor: '',
          room: '',
          bed: ''
        }));
      } else if (value === 'shared' && floors) {
        const sharedBedRooms = floors.flatMap(floor =>
          floor.floors.flatMap(floorData =>
            (floorData.rooms || []).filter(room => room.type === "shared")
          )
        );
        setRooms(sharedBedRooms);
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
          amount: sharingBedPrice,
          floor: '',
          room: '',
          bed: ''
        }));
      }
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
      setFormData(prevState => ({ ...prevState, [name]: value }));
      setErrors({ ...errors, [name]: '' }); // Clear error for the field on change
    } else if(name === 'paymentType'){
      setFormData(prevState => ({ ...prevState, [name]: value }));
      if (value === 'fullPayment') {
        // Set billingAmount to amount entered by the user
        setFormData(prevState => ({ ...prevState, billingAmount: formData.amount }));
      } else {
        // Set billingAmount to empty for advance payment type
        setFormData(prevState => ({ ...prevState, billingAmount: '' }));
      }
    }else {
      // Handle other form field changes
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };
  
  

  // Handle file change event to set profile photo
const handleFileChange = (event) => {
  const file = event.target.files[0];
  setProfilePhoto(file);  // Assuming setProfilePhoto is a state setter function
};


  useEffect(() => {
    if (location.state && location.state.user) {
      const userDataFromLocation = location.state.user;
      // Ensure you're setting all form fields correctly here
      setFormData({
        hostelUserId:userDataFromLocation._id,
        userType: userDataFromLocation.userType,
        name: userDataFromLocation.name,
        gender:userDataFromLocation.gender,
        fatherName: userDataFromLocation.fatherName,
        mobile: userDataFromLocation.mobile,
        age: userDataFromLocation.age,
        referredBy: userDataFromLocation.referredBy,
        aadharNumber: userDataFromLocation.aadharNumber,
        purposeFor: userDataFromLocation.purposeFor,
        address: userDataFromLocation.address,
        residenceCity: userDataFromLocation.residenceCity,
        state: userDataFromLocation.state,
        referenceMobile:userDataFromLocation.referenceMobile,
        requireRoomType: userDataFromLocation.requireRoomType,
        floor: userDataFromLocation.floor,
        room: userDataFromLocation.room,
        bed: userDataFromLocation.bed,
        billingCycle: userDataFromLocation.billingCycle,
        billingDate: userDataFromLocation.billingDate,
        paymentType:userDataFromLocation.paymentType,
        amount: userDataFromLocation.amount,
        billingAmount:userDataFromLocation.billingAmount,
        parentEmail:userDataFromLocation.parentEmail,
        parentPhoneNumber:userDataFromLocation.parentPhoneNumber,
        payment:userDataFromLocation.payment
      });
  
      // Set rooms and beds data after fetching completes
      const selectedFloor = floors.find(floor => floor._id === userDataFromLocation.floor);
      if (selectedFloor) {
        // Find the selected room
        const selectedRoom = selectedFloor.rooms.find(room => room._id === userDataFromLocation.room);
        // Filter out occupied beds from selected room
        const notOccupiedBeds = selectedRoom ? selectedRoom.beds.filter(bed => bed.status !== 'occupied') : [];
        setRooms(selectedFloor.rooms);
        setBeds(notOccupiedBeds);
      }
    }
  }, [location.state]); // Add floors dependency
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.userType) newErrors.userType = 'User Type is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if(!formData.gender) newErrors.gender = "Gender required"
    if (!formData.fatherName) newErrors.fatherName = "Father's Name is required";
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile Number must be exactly 10 digits';
    }
    if (!formData.parentPhoneNumber) {
      newErrors.parentPhoneNumber = 'Mobile Number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.parentPhoneNumber = 'Mobile Number must be exactly 10 digits';
    }
    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.aadharNumber) {
      newErrors.aadharNumber = 'Aadhar Number is required';
    } else if (formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar Number must be exactly 12 digits';
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.residenceCity) newErrors.residenceCity = "Residence City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.referenceMobile) {
      newErrors.referenceMobile = 'Reference Mobile Number is required';
    } else if (formData.referenceMobile.length !== 10) {
      newErrors.referenceMobile = 'Reference Mobile Number must be exactly 10 digits';
    }
    if (!formData.requireRoomType) newErrors.requireRoomType = 'Room Type is required';
    if (!formData.billingDate) newErrors.billingDate = 'Billing Date Type is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  



const handleSubmit = async (event) => { 
  event.preventDefault();
  if (!validateForm()) {
      return;
  }


  const formDataToSend = {
      userType: formData.userType,
      name: formData.name,
      gender:formData.gender,
      fatherName: formData.fatherName,
      mobile: formData.mobile,
      age: parseInt(formData.age),
      referredBy: formData.referredBy,
      aadharNumber: formData.aadharNumber,
      purposeFor: formData.purposeFor,
      address: formData.address,
      residenceCity: formData.residenceCity,
      state: formData.state,
      referenceMobile: formData.referenceMobile,
      requireRoomType: formData.requireRoomType,
      room: formData.room,
      bed: parseInt(formData.bed),
      billingCycle: formData.billingCycle,
      billingDate: formData.billingDate,
      paymentType: formData.paymentType,
      amount: parseInt(formData.amount),
      billingAmount: parseFloat(formData.billingAmount), // Ensure it's a number
      parentPhoneNumber: parseInt(formData.parentPhoneNumber),
      parentEmail: formData.parentEmail,
      payment: formData.payment
  };


  let formDataForApi = new FormData();

  Object.entries(formDataToSend).forEach(([key, value]) => {
      formDataForApi.append(key, value ?? '');
  });

  if (profilePhoto) {
      formDataForApi.append('profilePhoto', profilePhoto);
  }



  try {
      let url = `${apiUrl}/api/createhosteluser`;
      let method = 'POST';

      if (formData.hostelUserId) {
        url = `${apiUrl}/api/updatehosteluser/${formData.hostelUserId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
          method: method,
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          body: formDataForApi,
      });

      const responseData = await response.json();



      if (response.ok) {
        if (response.status === 201 || response.status === 200) {
          if (method === 'POST') {
            console.log('User created successfully:', responseData);

              const selectedRoom = floors.find(room => room._id === formData.room);
              const selectedBed = selectedRoom?.beds.find(bed => bed.bedNumber === parseInt(formData.bed));
              if (selectedBed) { 
                  selectedBed.status = 'occupied';
              }
            }else if (method === 'PUT') {
              console.log('User updated successfully:', responseData);
            }
              navigate('/home/pgusers'); // Navigate to the desired page on success
          } else {
              console.log('User created but bed allocation failed:', responseData);
              alert('Selected bed is not available. Please choose another.');
          }
      } else {
          console.error('Error sending data:', responseData.message);
          alert('An error occurred while submitting the form. Please try again.');
      }
  } catch (error) {
      console.error('Error sending data:', error.message);
      alert('An error occurred while submitting the form. Please try again.');
  }
};



 

  const floorData = () => {
    fetch(`${apiUrl}/api/floors`, {
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
     
      // Update the state with the fetched prices
      setSingleBedPrice(data.map((val)=>(val.singleBedPrice)));
      setSharingBedPrice(data.map((val)=>(val.sharingBedPrice)));
    })
    .catch(error => {
      console.error('Error fetching price data:', error);
      // Handle error appropriately
    });
  };
  

 
  useEffect(() => {
    floorData();
    handlePriceGet();
  }, []);


 
    
return(
    <>
    <div className="row">
  <div className="col-sm-6">
    <h2 className="mb-0">
      {location.state && location.state.user ? "Edit User" : "Add User"}
    </h2>
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
    onChange={handleChange}>
    <MenuItem value="select type" disabled>Select User Type</MenuItem>
    <MenuItem value="student">Student</MenuItem>
    <MenuItem value="working emp">Working Employee</MenuItem>
    <MenuItem value="guest">Guest</MenuItem>
  </Select>
  <div className="Mui-error text-danger">{errors.userType}</div>
</Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="name"
        name="name"
        label="Enter Name"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.name}
        onChange={handleChange}error={Boolean(errors.name)}
        helperText={errors.name}
      />
    </Grid>

    <Grid item  xs={12} sm={6}>
      <TextField
        required
        id="mobile"
        name="mobile"
        label="Mobile Number"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.mobile}
        onChange={handleChange}error={Boolean(errors.mobile)}
        helperText={errors.mobile}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        id="age"
        name="age"
        label="Age"
        fullWidth
        required
        autoComplete="off"
        variant="standard"
        value={formData.age}
        onChange={handleChange}error={Boolean(errors.age)}
        helperText={errors.age}
      />
    </Grid>

  <Grid item xs={12} sm={6}>
  <Select
    id="gender"
    name="gender"
    label="Gender"
    variant="standard"
    fullWidth
    required
    defaultValue="selectGender"
    value={formData.gender || "selectGender"} 
    onChange={handleChange}>
    <MenuItem value="selectGender" disabled>Select Gender</MenuItem>
    <MenuItem value="male">Male</MenuItem>
    <MenuItem value="female">Female</MenuItem>
  </Select>
  <div className="Mui-error text-danger">{errors.gender}</div>
</Grid>


    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="fatherName" 
        name="fatherName"
        label="Father name"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.fatherName}
        onChange={handleChange}error={Boolean(errors.fatherName)}
        helperText={errors.fatherName}
      />
    </Grid>

    <Grid item  xs={12} sm={6}>
      <TextField
        required
        id="parentPhoneNumber"
        name="parentPhoneNumber"
        label="Parent Mobile Number"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.parentPhoneNumber}
        onChange={handleChange}error={Boolean(errors.parentPhoneNumber)}
        helperText={errors.parentPhoneNumber}
      />
    </Grid>

  <Grid item xs={12} sm={6}>
  <TextField
    id="parentEmail"
    name="parentEmail"
    label="Enter Email"
    fullWidth
    autoComplete="parentEmail"
    variant="standard"
    type="email"  // Specifies that the input should be an email
    value={formData.parentEmail}
    onChange={handleChange}
   
  />
</Grid>

    <Grid item xs={12} sm={6}>
    <TextField
            id="referredBy"
            name="referredBy"
            label="Referred By"
            fullWidth
            autoComplete="off"
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
        required
        autoComplete="off"
        variant="standard"
        value={formData.aadharNumber}
        onChange={handleChange}error={Boolean(errors.aadharNumber)}
        helperText={errors.aadharNumber}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField  
        id="purposeFor"
        name="purposeFor"
        label="Purpose For"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.purposeFor}
        onChange={handleChange}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel shrink htmlFor="uploadAadhar">
      Upload Aadhar
    </InputLabel>
    <TextField  
      type="file"
      id="uploadAadhar"
      name="uploadAadhar"
      fullWidth
      autoComplete="upload-aadhar"
      variant="standard"
      value={formData.uploadAadhar}
      onChange={handleChange}
    />
  </FormControl>
</Grid>





    <Grid item xs={12} >
      <TextField
        required
        id="address"
        name="address"
        label="Address"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.address}
        onChange={handleChange}error={Boolean(errors.address)}
        helperText={errors.address}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="residenceCity"
        name="residenceCity"
        label="Residence City"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.residenceCity}
        onChange={handleChange}error={Boolean(errors.residenceCity)}
        helperText={errors.address}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="state"
        name="state"
        label="State"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.state}
        onChange={handleChange}error={Boolean(errors.state)}
        helperText={errors.state}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel shrink htmlFor="addressProof">
      Address Proof
    </InputLabel>
    <TextField  
      type="file"
      id="addressProof"
      name="addressProof"
      fullWidth
      autoComplete="address-proof"
      variant="standard"
      value={formData.addressProof}
      onChange={handleChange}
    />
  </FormControl>
</Grid>
    
    <Grid item xs={12} sm={6}>
  <FormControl fullWidth>
    <InputLabel shrink htmlFor="profilePhoto">
      Profile Photo
    </InputLabel>
    <TextField  
      type="file"
      id="profilePhoto"
      name="profilePhoto"
      fullWidth
      autoComplete="profile-photo"
      variant="standard"
      value={formData.profilePhoto}
      onChange={handleFileChange}
    />
  </FormControl>
</Grid>


    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="referenceMobile"
        name="referenceMobile"
        label="Reference Mobile Number"
        fullWidth
        autoComplete="off"
        variant="standard"
        value={formData.referenceMobile}
        onChange={handleChange}error={Boolean(errors.referenceMobile)}
        helperText={errors.referenceMobile}
      />
    </Grid>
    
<Grid item xs={12} sm={6}>
<Select
  id="requireRoomType"
  name="requireRoomType"
  label="Require Room Type"
  variant="standard"
  fullWidth
  required
  defaultValue="select type"
  onChange={handleChange}
>
  <MenuItem value="select type" disabled>Select Room User Type</MenuItem>
  <MenuItem value="single">Single</MenuItem>
  <MenuItem value="shared">Shared</MenuItem>
</Select>
<div className="Mui-error text-danger">{errors.requireRoomType}</div>
</Grid>




     
      
       
  

  <Grid item xs={12} sm={6}>
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


  

  <Grid item xs={12} sm={6}>
  <FormControl variant="standard" fullWidth required>
    <InputLabel htmlFor="bed">Bed</InputLabel>
    <Select
    id="bed"
      name="bed"
      label="Bed"
      variant="standard"
      fullWidth
      required
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
            <MenuItem value="monthly"  >Monthly</MenuItem>
            <MenuItem value="quarterly" disabled>Quarterly</MenuItem>
            <MenuItem value="yearly" disabled>Yearly</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} sm={6}>
      <InputLabel htmlFor="billingDate">Billing date</InputLabel>
      <TextField
        required
        id="billingDate"
        name="billingDate"
        type="date"
        fullWidth
        autoComplete="billing-date"
        variant="standard"
        value={formData.billingDate}
        onChange={handleChange}
        error={Boolean(errors.billingDate)}
        helperText={errors.billingDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>


      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="amount"
          name="amount"
          label="Amount"
          fullWidth
          autoComplete="off"
          variant="standard"
          value={formData.amount}
          onChange={handleChange}error={Boolean(errors.amount)}
          helperText={errors.amount}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
<Select
  id="paymentType"
  name="paymentType"
  label="Payment Type"
  variant="standard"
  fullWidth
  required
  defaultValue="Payment Type"
  // value={formData.paymentType}
  onChange={handleChange}
>
  <MenuItem value="Payment Type" disabled>Payment Type</MenuItem>
  <MenuItem value="advance">Advance</MenuItem>
  <MenuItem value="fullPayment">Full Payment</MenuItem>
</Select>
</Grid>




<Grid item xs={12} sm={6}>
        <TextField
          required
          id="billingAmount"
          name="billingAmount"
          label="Billing Amount"
          fullWidth
          autoComplete="off"
          variant="standard"
          value={formData.billingAmount}
          onChange={handleChange}error={Boolean(errors.billingAmount)}
          helperText={errors.billingAmount}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
<Select
  id="payment"
  name="payment"
  label="payment"
  variant="standard"
  fullWidth
  required
  defaultValue="select type"
  onChange={handleChange}
>
  <MenuItem value="select type" disabled>Paying Amount</MenuItem>
  <MenuItem value="cash">Cash</MenuItem>
  <MenuItem value="online">Online</MenuItem>
</Select>
</Grid>

</Grid>
    </div>
      </div>
    </div>
    </div>
    <div className="row">
        <div className='col-12 mb-5'>
          <div className="d-flex align-items-center justify-content-md-end">
        <Button variant="outlined" color="secondary"  className='mr-3' onClick={()=>navigate('/home/pgusers')}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>{location.state && location.state.user ? "Update" : "Create"}</Button>
        </div>
        </div>
    </div>
   </form>

  
    </>
)
}

export default AddUsers;

