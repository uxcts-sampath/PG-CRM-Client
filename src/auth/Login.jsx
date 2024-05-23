import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import logoWt from "/images/logo-wt.png";
import { useAuth } from "../components/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Login = ({ onSignin }) => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { signin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const token = sessionStorage.getItem("token");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.signupSuccess) {
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

 
  useEffect(() => {
    if (token) {
      onSignin();
      navigate("/home");
    }
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      // Send login data to the backend for validation
      const response = await fetch(`${apiUrl}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
    
      if (response.status === 200) {
     
        const responseData = await response.json();
        console.log('dgsfdv',responseData)
     
        const userId=responseData.user.id;
        const userName=responseData.user.fullName;
        const hostelName=responseData.user.hostelName;
        const refreshToken=responseData.refreshToken;
        const userSize=responseData.user.userSize;
        const paymentPlan=responseData.user.hasActivePaymentPlan;
        const suspensionDate=responseData.user.suspensionDate;
        const hideFreeOption = responseData.user.hideFreeOption;

        console.log('usersize',userSize)
      
        const { token } = responseData;
       
        sessionStorage.setItem("token", token);

        sessionStorage.setItem("userId",userId)

        sessionStorage.setItem("userName",userName)

        sessionStorage.setItem("hostelName",hostelName)

        sessionStorage.setItem("refreshToken",refreshToken)

        sessionStorage.setItem("userSize", userSize);

        sessionStorage.setItem("paymentPlan",paymentPlan)

        sessionStorage.setItem("suspensionDate",suspensionDate)

        sessionStorage.setItem("hideFreeOption",hideFreeOption)

      // Trigger the onSignin callback to update authentication state
        onSignin();

        // Redirect to the dashboard after successful login
        navigate("/home");

       setOpen(true)
       
      } else {
        const responseData = await response.json();
      
        console.log("Login failed", response.status, responseData.error);
  
        if (response.status === 401) {
          if (responseData.error === "UserNotFound") {
            setError("Email does not exist.");
          } else if (responseData.error === "InvalidPassword") {
            setError("Password is incorrect.");
          } else {
            setError("Bad credentials. Please check your password.");
          }
        } else {
          setError("Entered Email is incorrect");
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred. Please try again later.");
    }
  };

  

  
  
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src={logoWt} alt="logo" />
                  </div>
                  <h4>Hello! let's get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Email"
                        autoComplete="off"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        autoComplete="off"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        onClick={handleSubmit}
                      >
                        SIGN IN
                      </button>
                      {error && <div className="text-danger mt-2">{error}</div>}    
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          Keep me signed in
                        </label>
                      </div>
                      <a  className="auth-link text-black" style={{cursor:"pointer"}} onClick={()=>navigate("/forgotpassword")}>
                        Forgot password?
                      </a>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account?{" "}
                      <a style={{cursor:'pointer'}} onClick={()=>navigate("/register")} className="text-primary">
                        Create
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Signup completed successfully"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right', 
        }}
      />
    </>
  );
};

export default Login;
