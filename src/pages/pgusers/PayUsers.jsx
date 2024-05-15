import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PayUsers = () => {
    const token = sessionStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [userReferenceId, setUserReferenceId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);
    const [billingDate, setBillingDate] = useState('');
    const [payableAmount, setPayableAmount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [paymentHistory,setPaymentHistory]=useState("");
    const [payment,setPayment]=useState("");

    useEffect(() => {
        if (userReferenceId) {
            fetchUserDetails();
        }
    }, [userReferenceId]);


    useEffect(() => {
        setBillingDate(new Date().toISOString().split('T')[0]); // Set billingDate to today's date
    }, []);

    const handleUserReferenceIdChange = (event) => {
        setUserReferenceId(event.target.value);
    };

    useEffect(() => {
        const calculatedSubTotal = parseFloat(payableAmount) + parseFloat(pendingAmount);
        setSubTotal(calculatedSubTotal);
        let calculatedTotal = calculatedSubTotal;

        if (parseFloat(customAmount) > 0) {
            calculatedTotal = parseFloat(customAmount);
        }

        setTotal(calculatedTotal);
    }, [payableAmount, pendingAmount, customAmount]);

    const fetchUserDetails = () => {
        fetch(`${apiUrl}/api/paymentdetails/${userReferenceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                return response.json();
            })
            .then((data) => {
                setUserDetails(data);
    
                const currentDate = new Date().toISOString();
                const billingDate = new Date(data.billingDate).toISOString();
                const endDate = new Date(data.endDate).toISOString();
    
                if (currentDate < endDate) {
                    if (currentDate === billingDate) {
                        // Display payableAmount only if it's the billing date
                        setPayableAmount(data.amount);
                        setPendingAmount(data.paymentHistory[data.paymentHistory.length - 1].outstanding);
                    } else {
                        // Display pendingAmount if it's not the billing date
                        setPendingAmount(data.paymentHistory[data.paymentHistory.length - 1].outstanding);
                    }
                } else {
                    // After endDate, display both payableAmount and pendingAmount
                    setPayableAmount(data.amount);
                    setPendingAmount(data.paymentHistory[data.paymentHistory.length - 1].outstanding);
                }
    
                setPaymentHistory(data.paymentHistory);
                setError(null);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    };
    


    const handleUpdatePayment = () => {
        setError(null);

        const parsedPayableAmount = parseFloat(payableAmount);
        const parsedPendingAmount = parseFloat(pendingAmount);
        const parsedCustomAmount = parseFloat(customAmount);

        let updatedTotal = 0;

        if (parseFloat(customAmount) > 0) {
            updatedTotal = parseFloat(customAmount);
        } else {
            updatedTotal = parsedPayableAmount + parsedPendingAmount;
        }

        const updatedPaymentDetails = {
            userReferenceId: userReferenceId,
            paymentDetails: {
                billingDate: billingDate,
                payment: 'cash', // Assuming payment method is always 'cash' for now
                pendingAmount: parsedPendingAmount,
                payableAmount: parsedPayableAmount,
                subTotal: subTotal,
                customAmount: parsedCustomAmount,
                total: updatedTotal,
            },
        };

        fetch(`${apiUrl}/api/processPayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedPaymentDetails),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update payment details');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Payment details updated successfully:', data);
                navigate('/home/pgusers');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.message);
            });
    };

    return (
        <div>
            <div>
            <h2>User Payment</h2>
        </div>
        <div style={{display:'flex', justifyContent:'space-between'}} >

        

        <div>
        <div>
            <h5 style={{marginTop:'30px'}}>User ID</h5>
        </div>
        <div>
        <input
                type="text"
                value={userReferenceId}
                onChange={handleUserReferenceIdChange}
                placeholder="ID"
                className='refenceID'
                style={{marginTop:'5px'}}
            />
            {error && <p>{error}</p>}

            <div>
            <h3 style={{marginTop:'30px'}}>User Details</h3>
            </div>
            {userDetails && (
                <div className='payUserDetails'> 
                    <p className='payUserDetails-list'>Name <span>{userDetails.name}</span></p>
                    <p className='payUserDetails-list'>Type  <span>{userDetails.userType}</span></p>
                    <p className='payUserDetails-list'>Package <span> {userDetails.requireRoomType}</span></p>
                    <p className='payUserDetails-list'>Mobile<span> {userDetails.mobile}</span></p>
                    <p style={{display:'flex',justifyContent:'space-between'}}>Father Name<span> {userDetails.fatherName} </span></p>
                </div>
            )}


        </div>
        </div>

       <div>  
       <div>
                    <h4  style={{marginTop:'30px'}}>Payment</h4>
                </div>
            <div className='payUserDetails' >
                
            <div className='payingDetails'>
                    <label htmlFor="billingDate">Billing Date</label>
                    <input
                    className='payingList'
                        type="date"
                        id="billingDate"
                        value={billingDate}
                        onChange={(e) => setBillingDate(e.target.value)}
                        disabled // Disable the input field
                    />
                </div>


                <div className='payingDetails'>
                    <label htmlFor="payableAmount">Payable Amount</label>
                    <input
                     className='payingList'
    type="number"
    id="payableAmount"
    value={payableAmount}
    disabled
    onChange={(e) => {
        const value = e.target.value;
        setPayableAmount(value);
    }}
    onBlur={(e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setPayableAmount(value.toString());
        } else {
            setPayableAmount('');
        }
    }}
/>
</div>


            <div className='payingDetails'>           
                    <label htmlFor="pendingAmount">Outstanding Amount:</label>
                    <input
                    disabled
                        className='payingList'
                        type="number"
                        id="pendingAmount"
                        value={pendingAmount}
                        onChange={(e) => setPendingAmount(e.target.value)}
                    />
                </div>


                <div  style={{marginTop:'10px ', display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <label htmlFor="subTotal">Sub Total</label>
                    <input
                        type="number"
                        id="subTotal"
                        value={subTotal}
                        className='payingList'
                        disabled
                        onChange={(e) => setSubTotal(e.target.value)}
                    />
                </div>

              
            </div>
            <div className='paymentMethod' style={{marginTop:'30px'}}>
    <label htmlFor="paymentMethod">Payment Method *</label>
    <select
        id="paymentMethod"
        value="paymentType" // Default value set to 'cash'
        onChange={(e) => setPayment(e.target.value)} // Update the payment state

    >
        <option value="paymentType" disabled>Payment Type</option>
        <option value="cash">Cash</option>
        <option value="online">Online</option>
    </select>
</div>
            <div className='customAmount'>
    <label htmlFor="customAmount">Custom Amount *</label>
    <input
        required // Add the required attribute
        type="Number"
        id="customAmount"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
    />
</div>

                <div className='total'>
                    <label htmlFor="total">Total</label>
                    <input
                        type="number"
                        id="total"
                        value={total}
                        onChange={(e) => setTotal(e.target.value)}
                        disabled
                    />
                </div>

                <button className='payUserSubmit' onClick={handleUpdatePayment}>Submit</button>
        </div>
        
        </div>
        
        </div>
    );
};

export default PayUsers;
