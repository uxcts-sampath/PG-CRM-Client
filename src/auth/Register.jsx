import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoWt from "/images/logo-wt.png";
import logoWtS from "/images/logo-wt-s.png";

import { styled } from "@mui/material/styles";
// import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Register = () => {
  // Your imports and other code here...

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [step3Options, setStep3Options] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);


  // State variables for each step
  const [step1Data, setStep1Data] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    aadharNumber: "",
    email: "",
    password: "",
  });
  const [step2Data, setStep2Data] = useState({
    hostelName: "",
    userSize: "",
    address: "",
    state: "",
    city: "",
    country: "",
  });
  
  const [previousStepData, setPreviousStepData] = useState({});


  useEffect(() => {
   
  }, [step2Data.userSize]);

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

  
const handleInputChange = (e, stepNumber) => {
  const { name, value } = e.target;
  switch (stepNumber) {
    case 1:
      setStep1Data({
        ...step1Data,
        [name]: value,
      });
      break;
    case 2:
      setStep2Data({
        ...step2Data,
        [name]: value,
      });
      break;
    default:
      break;
  }
};


  const validateStep = () => {
    let isValid = true;
    const currentStepData = step === 1 ? step1Data : step2Data;
    const currentErrors = {};

    if (step === 1) {
        if (!step1Data.fullName) {
            currentErrors.fullName = "Full Name is required";
            isValid = false;
        }
        if (!step1Data.dateOfBirth) {
          currentErrors.dateOfBirth = "Date of Birth is required";
          isValid = false;
      } else {
          const dob = new Date(step1Data.dateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
              age--;
          }
          if (age < 18) {
              currentErrors.dateOfBirth = "Must be above 18 years old";
              isValid = false;
          }
      }
      
        if (!step1Data.phoneNumber) {
            currentErrors.phoneNumber = "Phone Number is required";
            isValid = false;
        }
        else if (!/^\d{10}$/.test(step1Data.phoneNumber)) {
            currentErrors.phoneNumber = "Phone Number must be 10 digits";
            isValid = false;
        }
        if (!step1Data.aadharNumber) {
            currentErrors.aadharNumber = "Aadhar Number is required";
            isValid = false;
        }
        else if (!/^\d{12}$/.test(step1Data.aadharNumber)) {
            currentErrors.aadharNumber = "Aadhar Number must be 12 digits";
            isValid = false;
        }
        if (!validateEmail(currentStepData.email)) {
      currentErrors.email = "Invalid email address";
      isValid = false;
    }
        if (!step1Data.password) {
            currentErrors.password = "Password is required";
            isValid = false;
        }
        else if (step1Data.password.length < 8) {
            currentErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }
        // Add validations for other fields in step 1
    } else if (step === 2) {
        if (!step2Data.hostelName) {
            currentErrors.hostelName = "Hostel Name is required";
            isValid = false;
        }
        if (!step2Data.userSize) {
            currentErrors.userSize = "User Size is required";
            isValid = false;
        }
        if (!step2Data.address) {
            currentErrors.address = "Address is required";
            isValid = false;
        }
        if (!step2Data.state) {
            currentErrors.state = "State is required";
            isValid = false;
        }
        if (!step2Data.city) {
            currentErrors.city = "City is required";
            isValid = false;
        }
        if (!step2Data.country) {
            currentErrors.country = "Country is required";
            isValid = false;
        }
    }

    setErrors(currentErrors);
    return isValid;
};

  

const handleStepChange = (nextStep) => {
  // Store the current step data before changing the step
  switch (step) {
    case 1:
      setPreviousStepData(step1Data);
      break;
    case 2:
      setPreviousStepData(step2Data);
      break;
    default:
      break;
  }
  if (nextStep >= 1 && nextStep <= 2) {
    setStep(nextStep);
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      if (step === 2) {
        submitForm();
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleClick = (message) => {
    console.log("Snackbar message:", message);
    setOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  const submitForm = async () => {
    try {
      // Merge data from all steps
      const formData = {
        ...step1Data,
        ...step2Data,
      };
  
      // Send data to the backend using fetch
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Registration successful");
        setSignupSuccess(true);
        navigate("/", { state: { signupSuccess: true } });
      } else if (response.status === 400) {
        try {
          const responseData = await response.json();
          console.log("Response data:", responseData); // Log the response data
          if (responseData && responseData.message === "Email already exists") {
            // Open Snackbar with the appropriate message from the response
            handleClick(responseData.message);
          } else {
            // Handle other 400 errors
            console.log("Registration failed with status 400:", responseData);
          }
        } catch (error) {
          console.log("Error parsing JSON:", error);
          // If parsing fails, log the response text directly
          const responseText = await response.text();
          console.log("Response text:", responseText);
        }
      } else {
        // Handle other errors
        console.log(
          "Registration failed",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  
  
  
  
  

  
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <>
      <div>
        <div className="container-scroller">
          <div className="container-fluid page-body-wrapper full-page-wrapper">
            <div className="content-wrapper p-0 m-0 auth">
              {/* <div className="row w-100 register-bgimg"> */}
              <div className="row w-100">
                <div className="col-lg-5 auth-bg-design 100vh">
                  <div className="container p-5 mt-4">
                    <div className="brand-logo">
                      <img src={logoWtS} alt="logo" />
                    </div>
                    <div className="m-top-30 ">
                      <h2>
                        Join BoarderBase <br></br> Streamline Your Hostel
                        Management Efforts!
                      </h2>
                    </div>
                    <div className="m-top-30 auth-box-txt p-3">
                      <p>
                        Ready to revolutionize your hostel management
                        experience? Join BoarderBase today and take control of
                        your operations like never before! With user-friendly
                        registration and personalized support, get ready to
                        elevate your hostel management game to new heights.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 p-0">
                  <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                    <h3>Create your account with us below</h3>
                    <br></br>
                    {/* <h6 className="font-weight-light">
                      Signing up is easy. It only takes a few steps{" "}
                    </h6> */}

                    {step === 1 && (
                      <form onSubmit={handleSubmit}>
                        <div className="col-md-12">
                        

                          <div className="form-group row">
                            <label className="col-sm-12">Full Name</label>
                            <div className="col-sm-12">
                            <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    value={previousStepData.fullName || step1Data.fullName || ""}
                                    onChange={(e) => handleInputChange(e, 1)} 
                                    autoComplete="off"
                                  />
                              {errors.fullName && (
                                <div className="text-danger">
                                  {errors.fullName}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Date of Birth</label>
                            <div className="col-sm-12">
                            <input
                                  type="date"
                                  name="dateOfBirth"
                                  className="form-control"
                                  value={step1Data.dateOfBirth || ""}
                                  onChange={(e) => handleInputChange(e, 1)}
                                />

                              {errors.dateOfBirth && (
                                <div className="text-danger">
                                  {errors.dateOfBirth}
                                </div>
                              )}
                            </div>
                          </div>
                         
                        </div>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Phone Number</label>
                            <div className="col-sm-12">
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control"
                                value={previousStepData.phoneNumber || step1Data.phoneNumber || ""}
                                onChange={(e) => handleInputChange(e, 1)}
                                autoComplete="off"
                              />
                              {errors.phoneNumber && (
                                <div className="text-danger">
                                  {errors.phoneNumber}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Aadhar Number</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="aadharNumber"
                                className="form-control"
                                value={previousStepData.aadharNumber || step1Data.aadharNumber || ""}
                                onChange={(e) => handleInputChange(e, 1)}
                                autoComplete="off"
                              />
                              {errors.aadharNumber && (
                                <div className="text-danger">
                                  {errors.aadharNumber}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Email</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="email"
                                className="form-control"
                                value={previousStepData.email || step1Data.email || ""}
                                onChange={(e) => handleInputChange(e, 1)}
                                autoComplete="off"
                              />
                              {errors.email && (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Password</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="password"
                                className="form-control"
                                value={previousStepData.password || step1Data.password || ""}
                                onChange={(e) => handleInputChange(e, 1)}
                                autoComplete="off"
                              />
                              {errors.password && (
                                <div className="text-danger">
                                  {errors.password}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Add more input fields for other data in Step 1 */}
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-block  btn-primary"
                          >
                            Next
                          </button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                          Don't have an account?{" "}
                          <a
                            onClick={() => navigate("/")}
                            className="text-primary"
                            style={{ cursor: "pointer" }}
                          >
                            signin
                          </a>
                        </div>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSubmit}>
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Hostel Name</label>
                            <div className="col-sm-12">
                            <input
                                type="text"
                                name="hostelName"
                                className="form-control"
                                value={previousStepData.hostelName || step2Data.hostelName || ""}
                                onChange={(e) => handleInputChange(e, 2)} 
                                autoComplete="off"
                              />
                              {errors.hostelName && (
                                <div className="text-danger">
                                  {errors.hostelName}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Add additional input fields */}
                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">User Size</label>
                            <div className="col-sm-12">
                              <select
                                className="form-control"
                                name="userSize"
                                value={previousStepData.userSize || step2Data.userSize || ""}
                                onChange={(e) => handleInputChange(e, 2)} 
                                autoComplete="off"
                              >
                                <option value="">Select user size</option>
                                <option value="1-250">1-250</option>
                                <option value="251-500+">251-500+</option>
                              </select>
                              {errors.userSize && (
                                <div className="text-danger">
                                  {errors.userSize}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Address</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={previousStepData.address || step2Data.address || ""}
                                onChange={(e) => handleInputChange(e, 2)} 
                                autoComplete="off"
                              />
                              {errors.address && (
                                <div className="text-danger">
                                  {errors.address}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">State</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="state"
                                className="form-control"
                                value={previousStepData.state || step2Data.state || ""}
                                onChange={(e) => handleInputChange(e, 2)} 
                                autoComplete="off"
                              />
                              {errors.state && (
                                <div className="text-danger">
                                  {errors.state}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">City</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="city"
                                className="form-control"
                                value={previousStepData.city || step2Data.city || ""}
                                onChange={(e) => handleInputChange(e, 2)}
                                autoComplete="off"
                              />
                              {errors.city && (
                                <div className="text-danger">{errors.city}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group row">
                            <label className="col-sm-12 ">Country</label>
                            <div className="col-sm-12">
                              <input
                                type="text"
                                name="country"
                                className="form-control"
                                value={previousStepData.country || step2Data.country || ""}
                                onChange={(e) => handleInputChange(e, 2)} 
                                autoComplete="off"
                              />
                              {errors.country && (
                                <div className="text-danger">
                                  {errors.country}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Add more input fields for other data in Step 2 */}

                        <button
                          type="button"
                          className="btn btn-secondary mr-2"
                          onClick={() => handleStepChange(1)}
                        >
                          Previous
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </form>
                    )}
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <span style={{ color: 'red' }}>{snackbarMessage}</span>
        }
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        
      />

    </div>

    </>
  );
};

export default Register;
