import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoWt from "/images/logo-wt.png";
import { useAuth } from "../components/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Box, Typography, Button } from "@mui/material";


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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.signupSuccess) {
      setIsModalVisible(true);
      setModalMessage("Signup completed successfully. Please wait for Admin Approval.");
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    console.log("Modal closed");  // Debugging log
  };

  useEffect(() => {
    if (token) {
      onSignin();
      navigate("/home");
    }
  }, [token, onSignin, navigate]);

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

      const responseData = await response.json();

      if (response.status === 200) {
        const {
          token, 
          refreshToken, 
          user: {
            id: userId, 
            fullName: userName, 
            hostelName, 
            userSize, 
            hasActivePaymentPlan: paymentPlan, 
            suspensionDate, 
            hideFreeOption
          }
        } = responseData;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("hostelName", hostelName);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("userSize", userSize);
        sessionStorage.setItem("paymentPlan", paymentPlan);
        sessionStorage.setItem("suspensionDate", suspensionDate);
        sessionStorage.setItem("hideFreeOption", hideFreeOption);

        // Trigger the onSignin callback to update authentication state
        onSignin();

        // Redirect to the dashboard after successful login
        navigate("/home");
      } else {
        console.log("Login failed", response.status, responseData.error);
        handleErrorResponse(response.status, responseData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleErrorResponse = (status, message) => {
    switch (status) {
      case 404:
        if (message === "User not found") {
          setError("Email does not exist.");
        } else if (message === "Invalid password") {
          setError("Password is incorrect.");
        } else {
          setError("Bad credentials. Please check your password.");
        }
        break;
        case 401:
         if (message === "Invalid password") {
          setError("Password is incorrect.");
        } else {
          setError("Bad credentials. Please check your password.");
        }

          break;
      case 403:
        if (message === "Your account is pending approval.") {
          setError("Your account is pending approval.");
        } else if (message === "Your account is on hold. Please contact support.") {
          setError("Your account is on hold. Please contact support.");
        } else if (message === "This account has been suspended.") {
          setError("Your account is suspended.");
        } else {
          setError("Access denied.");
        }
        break;
      case 400:
        setError("Invalid request. Please check your input.");
        break;
      default:
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
                      <a className="auth-link text-black" style={{ cursor: "pointer" }} onClick={() => navigate("/forgotpassword")}>
                        Forgot password?
                      </a>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account?{" "}
                      <a style={{ cursor: 'pointer' }} onClick={() => navigate("/register")} className="text-primary">
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
       <Modal
        open={isModalVisible}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Account Status
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            >
            OK
            </Button>
            <IconButton
            onClick={handleCloseModal}
            sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            }}
            >
            <CloseIcon />
            </IconButton>
            </Box>
            </Modal>
    </>
  );
};

export default Login;
