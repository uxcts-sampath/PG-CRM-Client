import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const PayUsers = () => {
    const token = sessionStorage.getItem('token');

    const navigate=useNavigate()
    const apiUrl = process.env.REACT_APP_API_URL;



    const [userReferenceId, setUserReferenceId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);

    const [billingDate, setBillingDate] = useState('');
    const [billingCycle,setBillingCycle]=useState('');
    const [paymentType, setPaymentType] = useState('advance');
    const [amountPaid, setAmountPaid] = useState('');
    const [customAmount, setCustomAmount] = useState(0); 
    const [payableAmount, setPayableAmount] = useState(0); // Added payableAmount state
    const [paymentStatus, setPaymentStatus] = useState('');
    const [pendingAmount,setPendingAmount]=useState('')
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    

    useEffect(() => {
        if (userReferenceId) {
            fetchUserDetails();
        }
    }, [userReferenceId]);

    const handleUserReferenceIdChange = (event) => {
        setUserReferenceId(event.target.value);
    };

    useEffect(() => {
        const calculatedSubTotal = Number(payableAmount) + Number(pendingAmount);
        setSubTotal(calculatedSubTotal);
        let calculatedTotal = calculatedSubTotal;
    
        if (paymentType !== 'pendingAmount') {
            calculatedTotal = customAmount > 0 ? customAmount : calculatedSubTotal;
        }
        setTotal(calculatedTotal);
    }, [payableAmount, pendingAmount, customAmount, paymentType]);


    useEffect(() => {
        // Update amountPaid based on paymentType
        let updatedAmountPaid = 0;
        if (paymentType === 'fullPayment') {
            updatedAmountPaid = Number(payableAmount) + Number(pendingAmount);
        } else if (paymentType === 'pendingAmount') {
            updatedAmountPaid = Number(pendingAmount);
        }
        setAmountPaid(updatedAmountPaid.toString()); // Convert back to string for input field
    }, [paymentType, payableAmount, pendingAmount]);
    


    const fetchUserDetails = () => {
        fetch(`${apiUrl}/api/paymentdetails/${userReferenceId}`, {
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
            setPayableAmount(data.amount);
            const latestPayment = data.paymentHistory[data.paymentHistory.length - 1]; // Get the latest payment
            setPendingAmount(latestPayment.pendingAmount); // Set pendingAmount from the latest payment
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
    

    // const handleUpdatePayment = () => {
    //     const updatedPaymentDetails = {
    //         userReferenceId: userReferenceId,
    //         paymentDetails: {
    //             billingDate: billingDate,
    //             paymentType: paymentType,
    //             amountPaid: amountPaid,
    //             paymentStatus: paymentStatus,
    //             customAmount: customAmount,
    //             subTotal: subTotal,
    //             total: total
    //         }
    //     };

    //     fetch(`/api/process-payment`, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`
    //         },
    //         body: JSON.stringify(updatedPaymentDetails)
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log('Payment details updated successfully:', data);
    //         navigate('/home/pgusers')
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //         setError('Failed to update payment details');
    //     });
    // };

    const handleUpdatePayment = () => {
        const updatedPaymentDetails = {
            userReferenceId: userReferenceId,
            paymentDetails: {
                billingDate: billingDate,
                billingCycle: billingCycle,
                paymentType: paymentType,
                amountPaid: parseFloat(amountPaid), // Convert to number
                paymentStatus: paymentStatus,
                customAmount: parseFloat(customAmount), // Convert to number
                subTotal: parseFloat(subTotal), // Convert to number
                total: parseFloat(total) // Convert to number
            }
        };
    
        fetch(`${apiUrl}/api/process-payment`, {
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
            navigate('/home/pgusers');
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
                    <label htmlFor="billingDate">Billing Date:</label>
                    <input
                        type="date"
                        id="billingDate"
                        value={billingDate}
                        onChange={(e) => setBillingDate(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="billingCycle">Billing Cycle :</label>
                    <select
                        id="billingCycle"
                        value={billingCycle}
                        onChange={(e) => setBillingCycle(e.target.value)}  >
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="pendingAmount">Pending Amount</option>

                    </select>
                </div>

                <div>
                    <label htmlFor="paymentType">Payment Type:</label>
                    <select
                        id="paymentType"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}  >
                        <option value="advance">Advance</option>
                        <option value="fullPayment">Full Payment</option>
                        <option value="pendingAmount">Pending Amount</option>

                    </select>
                </div>


                <div>
                    <label htmlFor="payableAmount">Payable Amount:</label> 
                    <input
                        type="text"
                        id="payableAmount"
                        value={payableAmount}
                        onChange={(e) => setPayableAmount(e.target.value)}
                    />
                </div>


                <div>
            <label htmlFor="pendingAmount">Pending Amount:</label> 
            <input
                type="text"
                id="pendingAmount"
                value={pendingAmount}
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
    </select>
</div>

            <div>
                    <label htmlFor="customAmount">Custom Amount:</label>
                    <input
                        type="text"
                        id="customAmount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                    />
                </div>

                <div>
                    <p>Sub Total: {subTotal}</p>
                    <p>Total: {total}</p>
                </div>
                <div>
    <label htmlFor="amountPaid">Amount Paid:</label>
    <input
        type="text"
        id="amountPaid"
        value={amountPaid} // Bind amountPaid to total
        onChange={(e) => setAmountPaid(e.target.value)}
    />
</div>

                <button onClick={handleUpdatePayment}>Pay Bill</button>
            </div>
        </div>
    );
};

export default PayUsers;
