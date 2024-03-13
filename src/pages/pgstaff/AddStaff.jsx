import React,{useState} from 'react'
import {  useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, Grid, Button } from '@mui/material'; 

const AddStaff=()=> {
    const navigate=useNavigate()

    const token = sessionStorage.getItem("token")   
    const [formData, setFormData] = useState({
        staffType: 'Manager',
    name: '', 
    fatherName: '', 
    mobile: '', 
    age: '', 
    aadharNumber: '',
    address: '',
    residenceCity: '', 
    state: '',
    shifts: 'Day', 
    billingCycle: 'monthly', 
    billingDate: '', 
    amount: '', 
    })

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault(); 
    
        try {
            const response = await fetch("/api/createstaff", {
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
            navigate('/home/pgstaff')
        } catch (error) {
            console.error('Error sending data:', error.message);
        }
    };

  return (
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
  id="staffType"
  name="staffType"
  label="Staff Type"
  variant="standard"
  fullWidth
  required
  defaultValue="Manager"
  onChange={handleChange}
>
  <MenuItem value="Manager">Manager</MenuItem>
  <MenuItem value="Reception">Reception</MenuItem>
  <MenuItem value="Chief Warden">Chief Warden</MenuItem>
  <MenuItem value="Warden Boys">Warden Boys</MenuItem>
  <MenuItem value="Warden Girls">Warden Girls</MenuItem>
  <MenuItem value="Care Taker">Care Taker</MenuItem>
  <MenuItem value="Employee">Employee</MenuItem>
  <MenuItem value="House Keeping">House Keeping</MenuItem>
  <MenuItem value="Sales & Marketing">Sales & Marketing</MenuItem>
  <MenuItem value="Cook">Cook</MenuItem>
  <MenuItem value="Helper">Helper</MenuItem>
  <MenuItem value="Gardner">Gardner</MenuItem>
  <MenuItem value="Security">Security</MenuItem>
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
        id="aadharNumber"
        name="aadharNumber"
        label="Aadhar Number"
        fullWidth
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
    <Select
  id="shifts"
  name="shifts"
  label="Shift Type"
  variant="standard"
  fullWidth
  required
  defaultValue="Day"
  onChange={handleChange}
>
  <MenuItem value="Day">Day</MenuItem>
  <MenuItem value="Night">Night</MenuItem>
  <MenuItem value="Full Day">Full Day</MenuItem>
</Select>
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

export default AddStaff