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


const MemberShipModal = (props) => {
    const { openWelcomeModal, setOpenWelcomeModal, modalCLose, hideFreeOption } = props;
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");
    const userName = sessionStorage.getItem("userName");
    const userSize = sessionStorage.getItem("userSize");
      const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [floors, setFloors] = useState([]);
    const userType = sessionStorage.getItem("userType");


    //   const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [value, setValue] = useState("");
    const [proceedClicked, setProceedClicked] = useState(false);
    const [showFreeSuccessModal, setShowFreeSuccessModal] = useState(false);
    const [showPaymentReminderModal, setShowPaymentReminderModal] = useState(false);

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
        const token = sessionStorage.getItem("token");
        if (token) {
            setShowSnackbar(true);
        }
    }, []);


    const handleChange = (event) => {
        setValue(event.target.value);
    };




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

                    const response = await fetch(`${apiUrl}/api/payment`, {
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
                    if (!response.ok) {
                        setOpenWelcomeModal(true);
                        setOpenPaymentModal(false);
                        throw new Error('Failed to Active Free Plan');
                    }
                    else {
                        modalCLose();
                        const responseData = await response.json();
                        console.log("API Response:", responseData);
                    }
                } else {
                    console.log("Selected paid option. Initiating payment plan.");
                    // Generate transactionId here or fetch it from the server
                    const transactionId = generateTransactionId(); // Generate the transaction ID

                    const response = await fetch(`${apiUrl}/api/payment`, {
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
                            console.log('rfsdx', responseData.url, typeof responseData.url)
                            const redirect_Payment_url = String(responseData.url)
                            // Redirect user to the new URL
                            window.open(redirect_Payment_url,"_self")
                        } else {
                            // Payment initiated successfully, handle response as needed
                            const responseData = await response.json();
                            // Redirect user to payment page or handle success case
                            window.open(responseData.data.instrumentResponse.redirectInfo.url,"_self")
                            // window.location.href = responseData.data.instrumentResponse.redirectInfo.url;
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
        fetch(`${apiUrl}/api/floors`, {
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

    useEffect(() => {
        floorData()
    }, [])


    return (

        <>
            <div>

            {userType !== 'admin' && (
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
                )}


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

        </>
    );
};

export default MemberShipModal;
