import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, RadioGroup, FormControlLabel, Radio } from "@mui/material";

import membership from "/images/membership_img.png"
import UpcomingFeeList from "../pages/pgusers/UpcomingFeeList";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '75%',
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
  const [floors,setFloors]=useState([]);

  const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [value, setValue] = useState("");
  const [proceedClicked, setProceedClicked] = useState(false);
  const [showFreeSuccessModal, setShowFreeSuccessModal] = useState(false);
  const [showPaymentReminderModal, setShowPaymentReminderModal] = useState(false);
  const [suspensionTime, setSuspensionTime] = useState(0);
  const [hideFreeOption, setHideFreeOption] = useState(false);

  const prices = {
    "1-250": {
      yearly: 21999,
      monthly: 1,
    },
    "251-500+": {
      yearly: 31999,
      monthly: 3999,
    },
  };

  
  const generateTransactionId = () => {
    // Generate a unique transaction ID based on your requirements
    return Date.now().toString(); // Example: Using current timestamp as transaction ID
  };


  
  

  useEffect(() => {
    const hasActivePaymentPlan = sessionStorage.getItem("hasActivePaymentPlan") === "true";
    const suspensionDate = new Date(sessionStorage.getItem("suspensionDate"));
    const today = new Date();
  
    // Check if the user is not on a payment plan and the suspension date has expired
    if (!hasActivePaymentPlan && suspensionDate <= today) {
      setOpenWelcomeModal(true);
      const hideFree = sessionStorage.getItem("hideFreeOption") === "true";
      setHideFreeOption(hideFree);
    }
  }, []);
  
  
  

  






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

//   const handleProceed = async () => {
//     if (value !== "") {
//         if (value === "free") {
//             // Handle Free Plan
//             setOpenWelcomeModal(false);
//             setOpenPaymentModal(false);
//             setProceedClicked(true);
//             sessionStorage.setItem("hasSelectedOptions", true);
//             sessionStorage.setItem("lastFreeSignInDate", new Date().toISOString());
//             setShowFreeSuccessModal(true);
//         } else {
//             // Handle Yearly and Monthly Plans
//             const price = prices[userSize][value]; // Get the price based on the selected plan and user size
//             if (price) {
//                 try {

//                     // Make API call to process payment
//                     const response = await fetch("/api/payment", {
                    
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: JSON.stringify({
//                             userId: userId,
//                             userSize: userSize,
//                             paymentPlan: value,
//                             amount: price // Pass the amount to the backend
//                         }),
//                     });
//                     const responseData = await response.json();
                   

//                     console.log("response",response)

//                     console.log('fvxvcxc',response.url)

//                     if (responseData.success) {
//                         if (responseData.url) {
//                             // Redirect user to the new URL
//                             window.location.href = responseData.url;
//                         } else {
//                             // Payment initiated successfully, handle response as needed
//                             const responseData = await response.json();
//                             console.log('rfsdx',responseData)
//                             // Redirect user to payment page or handle success case
//                             window.location.href = responseData.data.instrumentResponse.redirectInfo.url;
//                         }
//                     } else {
//                         // Handle payment initiation failure
//                         console.error("Failed to initiate payment:", response.statusText);
//                         // Show error message to the user or handle the error appropriately
//                     }
//                 } catch (error) {
//                     console.error("Error initiating payment:", error);
//                     // Handle payment initiation error
//                     // Show error message to the user or handle the error appropriately
//                 }
//             } else {
//                 console.error("Price not found for the selected plan and user size");
//             }
//         }
//     } else {
//         console.log("Please select a membership option before proceeding.");
//     }
// };




const handleProceed = async () => {
  try {
    console.log("Handle Proceed function called");
    if (value !== "") {
      console.log("Selected value inside handleProceed:", value);
      if (value === "free") {
        console.log("Selected free option. Initiating free plan.");
        setOpenWelcomeModal(false);
        setOpenPaymentModal(false);
        setProceedClicked(true);
        sessionStorage.setItem("hasSelectedOptions", true);
        sessionStorage.setItem("lastFreeSignInDate", new Date().toISOString());
        setShowFreeSuccessModal(true);

        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            userSize: userSize,
            paymentPlan: value,
            amount: 0,
            transactionId: "N/A", // Example: Set transactionId as "N/A" for free plan
          }),
        });
        const responseData = await response.json();
        console.log("API Response:", responseData);
      } else {
        console.log("Selected paid option. Initiating payment plan.");
        // Generate transactionId here or fetch it from the server
        const transactionId = generateTransactionId(); // Generate the transaction ID

        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            userSize: userSize,
            paymentPlan: value,
            amount: prices[userSize][value],
            transactionId: transactionId, // Include the generated transactionId
          }),
        });
        const responseData = await response.json();
        console.log("API Response:", responseData);


                            if (responseData.success) {
                        if (responseData.url) {
                            // Redirect user to the new URL
                            window.location.href = responseData.url;
                        } else {
                            // Payment initiated successfully, handle response as needed
                            const responseData = await response.json();
                            console.log('rfsdx',responseData)
                            // Redirect user to payment page or handle success case
                            window.location.href = responseData.data.instrumentResponse.redirectInfo.url;
                        }
                    } else {
                        // Handle payment initiation failure
                        console.error("Failed to initiate payment:", response.statusText);
                        // Show error message to the user or handle the error appropriately
                    }
      }
    } else {
      console.log("Please select a membership option before proceeding.");
    }
  } catch (error) {
    console.error("Error in handleProceed:", error);
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
    setOpenWelcomeModal(false);
  };

  const calculateDiscountedPrice = (price) => {
    const discountedPrice = price - price * 0.3;
    return discountedPrice.toFixed(2);
  };

  const handleBack = () => {
    setOpenWelcomeModal(false);
    setOpenPaymentModal(false);
  };


  const floorData = () => {
    fetch("/api/floors", {
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
    })
    .catch(error => console.error('Error fetching floor data:', error));
  };

  useEffect(()=>{
    floorData()
  },[])


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



      {floors?.length>0 && floors?.map((floor)=>(
      <div className="row  mt-3">
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">Rooms</h5>
                  </div>
                  <div className="col-lg-12">Total Rooms - {floor.totalRooms}</div>
                  {/* <div className="col-lg-12">Occipied - 12</div> */}
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
                  <div className="col-lg-12">Avaliable - {floor.availableBeds}</div>
                  <div className="col-lg-12">Occipied - {floor.occupiedBeds}</div>
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
  ))}


      <UpcomingFeeList />

      <div>
        <Modal
          open={openWelcomeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description" >
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
                 {!hideFreeOption && (
    <FormControlLabel
      value="free"
      control={<Radio />}
      label={
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
      }
    />
  )}
                </RadioGroup>
                <Button className="text-light bg-secondary" onClick={handleProceed}>Proceed</Button>

              </Grid>
            </Grid>
          </Box>
        </Modal>


        <Modal
          open={openPaymentModal}
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
          open={showFreeSuccessModal}
          aria-labelledby="modal-free-success-title"
          aria-describedby="modal-free-success-description"  >
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
          open={showPaymentReminderModal}
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
