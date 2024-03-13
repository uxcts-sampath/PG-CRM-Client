import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid,RadioGroup,FormControlLabel,Radio } from "@mui/material";

import membership from "/images/membership_img.png"
import UpcomingFeeList from "../pages/pgusers/UpcomingFeeList";

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height:'75%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
};


const Home = () => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const userSize = sessionStorage.getItem("userSize");
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [value, setValue] = useState("");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [showFreeSuccessModal, setShowFreeSuccessModal] = useState(false);
  const [showPaymentReminderModal, setShowPaymentReminderModal] = useState(false);
  const [suspensionTime, setSuspensionTime] = useState(0);

  const prices = {
    "1-250": {
      yearly: 21999,
      monthly: 2999,
    },
    "251-500+": {
      yearly: 31999,
      monthly: 3999,
    },
  };

  useEffect(() => {
    const hasLoggedInBefore = sessionStorage.getItem("hasLoggedIn");
    const hasSelectedOptions = sessionStorage.getItem("hasSelectedOptions");
    const lastFreeSignInDate = sessionStorage.getItem("lastFreeSignInDate");

    if (!hasLoggedInBefore || !userSize) {
      setOpenWelcomeModal(true);
      sessionStorage.setItem("hasLoggedIn", true);
    } else if (!hasSelectedOptions) {
      setOpenWelcomeModal(true);
    } else if (value === "free" && lastFreeSignInDate) {
      const today = new Date();
      const lastSignInDate = new Date(lastFreeSignInDate);
      const timeDifference = today.getTime() - lastSignInDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      if (daysDifference >= 60) {
        setShowPaymentReminderModal(true);
      }
    } else {
      setOpenPaymentModal(true);
    }
  }, [userSize, proceedClicked, value, suspensionTime]);

  useEffect(() => {
    // Calculate suspension time based on user's payment method and update state
    if (value === "free") {
      setSuspensionTime(/* Calculate suspension time for free subscription */);
    } else {
      setSuspensionTime(0); // No suspension time for paid subscriptions
    }
  }, [value]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setShowSnackbar(true);
    }
  }, []);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleProceed = async () => {
    if (value !== "") {
      setOpenWelcomeModal(false);
      setOpenPaymentModal(true);
      setProceedClicked(true);
      sessionStorage.setItem("hasSelectedOptions", true);
      sessionStorage.setItem("lastFreeSignInDate", new Date().toISOString());

      if (value === "free") {
        try {
          const response = await fetch("/api/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: userId, // Include the user ID
              userSize: userSize, // Include the user size
              paymentPlan: value, // Include the selected payment plan
            }),
          });

          if (response.ok) {
            setShowFreeSuccessModal(true);
          } else {
            console.error("Failed to create hostel membership:", response.statusText);
            // Handle the error, show message to the user, etc.
          }
        } catch (error) {
          console.error("Error creating hostel membership:", error);
          // Handle the error, show message to the user, etc.
        }
      }
    } else {
      console.log("Please select a membership option before proceeding.");
    }
  };

  const handleFreeSuccessClose = () => {
    setShowFreeSuccessModal(false);
    setOpenPaymentModal(false);
    const token = sessionStorage.getItem("token");
    navigate("/home", { state: { token: token } });
  };

  const handlePaymentReminderClose = () => {
    setShowPaymentReminderModal(false);
    setOpenWelcomeModal(true);
  };

  const calculateDiscountedPrice = (price) => {
    const discountedPrice = price - price * 0.3;
    return discountedPrice.toFixed(2);
  };

  const handleBack = () => {
    setOpenWelcomeModal(true);
    setOpenPaymentModal(false);
  };

  


  return (
    
    <>
      <div className="row">
        <div className="col-sm-6">
          <h2 className="mb-0">Welcome <span className=" text-secondary">{userName}</span></h2>
          <p className="small mt-1">Hope you are doing good..</p>
        </div>
        <div className="col-sm-6">
          <div className="d-flex align-items-center justify-content-md-end">
            <div className="mb-3 mb-xl-0 pr-1">
              <div className="dropdown">
                <button
                  className="btn bg-white btn-sm dropdown-toggle btn-icon-text border mr-2"
                  type="button"
                  id="dropdownMenu3"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="typcn typcn-calendar-outline mr-2"></i>Last 7
                  days
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuSizeButton3"
                  data-x-placement="top-start"
                >
                  <h6 className="dropdown-header">Last 14 days</h6>
                  <a className="dropdown-item" href="#">
                    Last 21 days
                  </a>
                  <a className="dropdown-item" href="#">
                    Last 28 days
                  </a>
                </div>
              </div>
            </div>
            <div className="pr-1 mb-3 mr-2 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm bg-white btn-icon-text border"
              >
                <i className="typcn typcn-arrow-forward-outline mr-2"></i>Export
              </button>
            </div>
            <div className="pr-1 mb-3 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm bg-white btn-icon-text border"
              >
                <i className="typcn typcn-info-large-outline mr-2"></i>info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row  mt-3">
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">Rooms</h5>
                  </div>
                  <div className="col-lg-12">Avaliable - 6</div>
                  <div className="col-lg-12">Occipied - 12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="card-title mb-3">Beds</h4>
                  </div>
                  <div className="col-lg-12">Avaliable - 30</div>
                  <div className="col-lg-12">Occipied - 60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="card-title mb-3">Users</h4>
                  </div>
                  <div className="col-lg-12">Open - 30</div>
                  <div className="col-lg-12">Occipied - 60</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">Revenue</h5>
                  </div>
                  <div className="col-lg-12">Income - 20000</div>
                  <div className="col-lg-12">Expensess - 12000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpcomingFeeList />

      <div>
       <Modal
        open={openWelcomeModal && suspensionTime === 0}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h4" component="h2">
      Welcome to BoarderBase
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <img style={{ width: '45%', margin: '60px 0 30px 60px' }} src={membership} alt="Logo" />
        <Typography variant="h4" component="h2">Your Membership is</Typography>
        <Typography variant="h3" component="h2" style={{ margin: '10px 0 10px 50px ' }}>
  {parseInt(userSize) <= 250 ? 'BB MINI' : 'BB MAX'}
</Typography>


        <Typography variant="h6" component="h2">Hostel Users {userSize} members</Typography>
      </Grid>
      <Grid item xs={7}>
      <RadioGroup aria-label="subscription" name="subscription" value={value} onChange={handleChange}>

          {prices && prices[userSize] && Object.entries(prices[userSize]).map(([period, price]) => (
            <FormControlLabel
              key={period}
              value={period}
              control={<Radio />}
              disabled
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <span>{period.charAt(0).toUpperCase() + period.slice(1)}</span>
                  </div>
                  {period === 'yearly' && (
                    <div className="text-secondary ml-4" >
                      <h6 className="text-center">Save 30%</h6>
                      <p>2 MONTH TRAIL + 12 MONTHS + 2 BONUS</p>
                    </div>
                  )}
                {period === 'yearly' && (
  <div>
    <h6 className="text-danger ml-4">
      <strike>₹{price}</strike>
    </h6>
  </div>
)}



                <div className="ml-4 border-left pl-2">
  <h6 className="text-right">INR</h6>
  {period === 'yearly' ? (
    <span className="discount-info">₹{calculateDiscountedPrice(price)}</span>
  ) : (
    <span>₹{price}</span>
  )}
</div>

                </div>
              }
            />
          ))}
          <FormControlLabel value="free" control={<Radio />} label={
            <div className="d-flex align-items-center">
              <div>
                <span>Free</span>
              </div>
              <div className="text-secondary">
                <p>2 MONTHS TRAIL</p>
              </div>
              <div className="ml-4 border-left pl-2">
                <h6 className="text-right">INR</h6>
                <h6>0</h6>
              </div>
            </div>
          } />
        </RadioGroup>
        <Button className="text-light bg-secondary" onClick={handleProceed}>Proceed</Button>

      </Grid>
    </Grid>
  </Box>
</Modal>


<Modal
        open={openPaymentModal && suspensionTime === 0}
        aria-labelledby="modal-payment-title"
        aria-describedby="modal-payment-description"
      >
        <Box sx={style}>
          <Typography id="modal-payment-title" variant="h4" component="h2">
            Payment Page
          </Typography>
          <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
            This is the payment page. Please proceed with your payment.
          </Typography>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Modal>
      <Modal
        open={showFreeSuccessModal && suspensionTime === 0}
        aria-labelledby="modal-free-success-title"
        aria-describedby="modal-free-success-description"
      >
        <Box sx={style}>
          <Typography variant="h4" component="h2">
            Free Sign-in Successful!
          </Typography>
          <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
            Congratulations! You have successfully signed in for free.
          </Typography>
          <Button onClick={handleFreeSuccessClose}>Close</Button>
        </Box>
      </Modal>

      <Modal
        open={showPaymentReminderModal && suspensionTime === 0}
        aria-labelledby="modal-payment-reminder-title"
        aria-describedby="modal-payment-reminder-description"
      >
          <Box sx={style}>
            <Typography id="modal-payment-reminder-title" variant="h4" component="h2">
              Select a Payment Method
            </Typography>
            <Typography variant="body1" component="p" style={{ marginTop: '20px' }}>
              It's been 60 days since your last sign-in. Please select a payment method to continue.
            </Typography>
            <Button onClick={handlePaymentReminderClose}>Close</Button>
          </Box>
        </Modal>
      </div>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Login successful"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right', // You can adjust this as per your requirement
        }}
      />

    </>
  );
};

export default Home;
