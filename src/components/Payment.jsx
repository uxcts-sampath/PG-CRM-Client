import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";


const Payment = () => {
    const navigate = useNavigate();
    const { merchantID, transactionId } = useParams();
    const location = useLocation();

    console.log(merchantID, transactionId, "Payment Check Status Ids");

    const apiUrl = process.env.REACT_APP_API_URL;
    const [paymentStatus, setPaymentStatus] = useState(false);

    const NavigateHome = () => {
        navigate('/home')
    }
    const fetchPlanDetailes = async () => {
        try {
            const payLoad = {
                merchantTransactionId: transactionId
            }
            const token = sessionStorage.getItem("token");
            console.log(token, "asasas")
            const response = await fetch(`${apiUrl}/api/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payLoad)
            });
            console.log(response.data)

            if (!response.ok) {
                setPaymentStatus(false);
                throw new Error('Payment Failed');
            }
            else {
                setPaymentStatus(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    React.useEffect(() => {
        fetchPlanDetailes();
    }, [location])


    return (
        <div>
            <div>
                {paymentStatus ? <>
                    <h1>Success</h1>
                    <h4>Payment Proceessd !</h4>
                    <p> Thank You for Choosing this Payment Plan</p>
                    <div>
                        <button onClick={NavigateHome}>Continue</button>
                    </div>
                </>
                    :
                    <>
                        <h1>Failure</h1>
                        <h4>Payment Failed !</h4>
                        <p> Thank You for Choosing this Payment Plan</p>
                        <div>
                            <button onClick={NavigateHome}>Retry Payment</button>
                        </div>
                    </>
                }

            </div>

        </div>
    )
}

export default Payment;