import React,{useState} from 'react';


import Grid from '@mui/material/Grid';
import {  useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import { Button } from '@mui/material';

const AddUsers=()=> {
    const token = sessionStorage.getItem("token")
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        userType: 'student',
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
        floor: '',
        room: '',
        billingCycle: 'monthly',
        billingDate: '',
        amount: '',
      });
    

   

    

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        try {
            const response = await fetch("/api/createhosteluser", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData), // Use the formData state variable
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            const data = await response.json();
            console.log('Success:', data);
            navigate('/home/pgusers')
        } catch (error) {
            console.error('Error sending data:', error.message);
        }
    };
    

    
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
            defaultValue="student" 
            onChange={handleChange}
          >
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
            defaultValue="single"
            onChange={handleChange} >
            <MenuItem value="single">Single</MenuItem>
            <MenuItem value="shared">Shared</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
        <TextField
          required
          id="floor"
          name="floor"
          label="Floor"
          fullWidth
          autoComplete="floor"
          variant="standard" 
          onChange={handleChange}/>
    </Grid>
    <Grid item xs={12} sm={3}>
    <TextField
          required
          id="room"
          name="room"
          label="Room"
          fullWidth
          autoComplete="room"
          variant="standard"
          onChange={handleChange}/>
    </Grid>
    <Grid item xs={12} sm={6}>
          <Select
            id="billingCycle"
            name="billingCycle"
            label="Billing Cycle"
            variant="standard"
            fullWidth
            required
            defaultValue="monthly"
            onChange={handleChange}
          >
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