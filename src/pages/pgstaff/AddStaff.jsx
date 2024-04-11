import React,{useState} from 'react'
import {  useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, Grid, Button } from '@mui/material'; 

const AddStaff=()=> {
    const navigate=useNavigate()

    const [errors, setErrors] = useState({});

    const token = sessionStorage.getItem("token")   
    const [formData, setFormData] = useState({
        staffType: '',
    name: '', 
    fatherName: '', 
    mobile: '', 
    age: '', 
    aadharNumber: '', 
    address: '',
    residenceCity: '', 
    state: '',
    shifts: '', 
    billingCycle: '', 
    billingDate: '', 
    amount: '', 
    })

    const handleChange = (event) => {
      console.log(`Field changed: ${event.target.name}, Value: ${event.target.value}`);
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
        setErrors({ ...errors, [event.target.name]: '' });
      };


      const validateForm = () => {
        const newErrors = {};
        if (!formData.staffType) newErrors.staffType = 'Staff Type is required';
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.fatherName.trim()) newErrors.fatherName = 'Father Name is required';
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile Number is required';
        } else if (formData.mobile.length !== 10) {
          newErrors.mobile = 'Mobile Number must be exactly 10 digits';
        }
        if (!formData.age.trim()) newErrors.age = 'Age is required';
        if (!formData.aadharNumber) {
          newErrors.aadharNumber = 'Aadhar Number is required';
        } else if (formData.aadharNumber.length !== 12) {
          newErrors.aadharNumber = 'Aadhar Number must be exactly 12 digits';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.residenceCity.trim()) newErrors.residenceCity = 'Residence City is required';
        if (!formData.state.trim()) newErrors.state = 'State City is required';
        if (!formData.shifts.trim()) newErrors.shifts = 'Shift Type is required';
        if (!formData.billingCycle.trim()) newErrors.billingCycle = 'Salary Type is required';
        if (!formData.billingDate.trim()) newErrors.billingDate = 'Billing Date is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      }

      const handleSubmit = async (event) => {
        event.preventDefault(); 
        if (!validateForm()) {
          return;
        }
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
          <h2 className="mb-0">Add Staff</h2>
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
  defaultValue="selectStaffType"
  onChange={handleChange}error={Boolean(errors.name)}
        helperText={errors.name}>
     <MenuItem value="selectStaffType" disabled>Select Staff Type</MenuItem>
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
<div className="Mui-error text-danger">{errors.staffType}</div>

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
        
        onChange={handleChange}error={Boolean(errors.name)}
        helperText={errors.name}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        id="fatherName"
        name="fatherName"
        label="Father Name"
        fullWidth
        autoComplete="off"
        variant="standard"
        onChange={handleChange}error={Boolean(errors.fatherName)}
        helperText={errors.fatherName}
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
        autoComplete="off"
        variant="standard"
        onChange={handleChange}error={Boolean(errors.age)}
        helperText={errors.age}
      />
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <TextField
        id="aadharNumber"
        name="aadharNumber"
        label="Aadhar Number"
        autoComplete="off"
        fullWidth
        variant="standard"
        onChange={handleChange}error={Boolean(errors.aadharNumber)}
        helperText={errors.aadharNumber}
      />
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
        onChange={handleChange}error={Boolean(errors.residenceCity)}
        helperText={errors.residenceCity}
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
        onChange={handleChange}error={Boolean(errors.state)}
        helperText={errors.state}
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
        defaultValue="shiftType"
        onChange={handleChange}>
      <MenuItem value="shiftType" disabled>Shift Type</MenuItem>
      <MenuItem value="Day">Day</MenuItem>
      <MenuItem value="Night">Night</MenuItem>
      <MenuItem value="Full Day">Full Day</MenuItem>
    </Select>
    <div className="Mui-error text-danger">{errors.shifts}</div>
    </Grid>
      
   
    <Grid item xs={12} sm={6}>
          <Select
            id="billingCycle"
            name="billingCycle"
            label="Billing Cycle"
            variant="standard"
            fullWidth
            required
            defaultValue="salaryType"
            onChange={handleChange}
          >
             <MenuItem value="salaryType" disabled>Salary Type</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
          <div className="Mui-error text-danger">{errors.billingCycle}</div>
        </Grid>

    <Grid item xs={12} sm={6}>
    <TextField
          required
          type='date'
          id="billingDate"
          name="billingDate"
          label="Billing date"
          fullWidth
          autoComplete="billing-date"
          variant="standard"
          onChange={handleChange}error={Boolean(errors.billingDate)}
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
        <Button variant="outlined" color="secondary"  className='mr-3' onClick={()=>navigate('/home/pgstaff')}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSubmit}>Create</Button>
        </div>
        </div>
    </div>
   </form>



    </>
  )
}

export default AddStaff