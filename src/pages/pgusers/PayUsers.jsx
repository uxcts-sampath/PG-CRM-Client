import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const PayUsers = () => {
    const token = sessionStorage.getItem('token');

    const navigate=useNavigate()


    const [userReferenceId, setUserReferenceId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    const [billingCycle, setBillingCycle] = useState('');
    const [billingDate, setBillingDate] = useState('');
    const [paymentType, setPaymentType] = useState('advance');
    const [amountPaid, setAmountPaid] = useState('');
    const [billingAmount, setBillingAmount] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    

    useEffect(() => {
        if (userReferenceId) {
            fetchUserDetails();
        }
    }, [userReferenceId]);

    const handleUserReferenceIdChange = (event) => {
        setUserReferenceId(event.target.value);
    };

    const fetchUserDetails = () => {
        fetch(`/api/paymentdetails/${userReferenceId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if data is empty or null
            if (!data) {
                throw new Error('User details not found');
            }
            setUserDetails(data);
            // Reset error state when details are successfully fetched
            setError(null);
        })
        .catch(error => {
            console.error('Error:', error);
            // Update error state only if there's a network-related error
            if (error.message === 'Network response was not ok') {
                setError('Failed to fetch user details');
            }
        });
    };
    

    const handleUpdatePayment = () => {
        const updatedPaymentDetails = {
            userReferenceId: userReferenceId,
            paymentDetails: {
                billingCycle: billingCycle,
                billingDate: billingDate,
                paymentType: paymentType,
                amountPaid: amountPaid,
                billingAmount: billingAmount,
                paymentStatus: paymentStatus
            }
        };

        fetch(`/api/process-payment`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedPaymentDetails)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Payment details updated successfully:', data);
            navigate('/home/pgusers')
        })
        .catch(error => {
            console.error('Error:', error);
            setError('Failed to update payment details');
        });
    };

    return (
        <div>
            <input
                type="text"
                value={userReferenceId}
                onChange={handleUserReferenceIdChange}
                placeholder="Enter User Reference ID"
            />
            {error && <p>{error}</p>}
            {userDetails && (
                <div>
                    <h2>User Details</h2>
                    <p>Name: {userDetails.name}</p>
                    <p>Mobile: {userDetails.mobile}</p>
                </div>
            )}

            <div>
                <div>
                    <label htmlFor="billingCycle">Billing Cycle:</label>              
                    <select
                        id="billingCycle"
                        value={billingCycle}
                        onChange={(e) => setBillingCycle(e.target.value)}>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly"> Yearly</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="billingDate">Billing Date:</label>
                    <input
                        type="date"
                        id="billingDate"
                        value={billingDate}
                        onChange={(e) => setBillingDate(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="paymentType">Payment Type:</label>
                    <select
                        id="paymentType"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <option value="advance">Advance</option>
                        <option value="fullPayment">Full Payment</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="billingAmount">Billing Amount:</label>
                    <input
                        type="text"
                        id="billingAmount"
                        value={billingAmount}
                        onChange={(e) => setBillingAmount(e.target.value)}
                    />
                </div>
                
                <div>
                    <label htmlFor="amountPaid">Amount Paid:</label>
                    <input
                        type="text"
                        id="amountPaid"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                    />
                </div>
                <div>
    <label htmlFor="paymentStatus">Payment Status:</label>
    <select
        id="paymentStatus"
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
    >
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
    </select>
</div>


                <button onClick={handleUpdatePayment}>Pay Bill</button>
            </div>
        </div>
    );
};

export default PayUsers;
