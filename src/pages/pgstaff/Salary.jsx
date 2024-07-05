import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userprofileImage from '/theme/images/faces/face29.png';

const StaffSalary = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const [staffData, setStaffData] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState({
        staffId: '',
        date: new Date().toISOString().split('T')[0],
        modeofPayment: '',
        customAmount: 0,
        payableAmount: 0,
        outstandingAmount: 0,
        subTotal: 0,
        total: 0,
    });
    const [salaries, setSalaries] = useState([]);

    useEffect(() => {
        handleStaffData();
    }, []);

    useEffect(() => {
        if (selectedStaff) {
            handleSalaryDetails(selectedStaff._id);
        }
    }, [selectedStaff]);

    useEffect(() => {
        const customAmount = parseFloat(paymentDetails.customAmount || 0);
        const newOutstandingAmount = parseFloat(paymentDetails.outstandingAmount || 0) - customAmount;
        setPaymentDetails(prevPaymentDetails => ({
            ...prevPaymentDetails,
            total: customAmount,
            outstandingAmount: newOutstandingAmount < 0 ? 0 : newOutstandingAmount,
        }));
    }, [paymentDetails.customAmount]);

    const handleStaffData = () => {
        fetch(`${apiUrl}/api/getallstaff`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setStaffData(data);
            data.forEach(staff => {
                handleSalaryDetails(staff._id);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handlePaySalary = (staffId) => {
        const paymentData = {
            ...paymentDetails,
            staffId,
            payableAmount: parseFloat(paymentDetails.payableAmount),
            outstandingAmount: parseFloat(paymentDetails.outstandingAmount),
            customAmount: parseFloat(paymentDetails.customAmount),
            date: paymentDetails.date,
        };

        fetch(`${apiUrl}/api/paysalary/${staffId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => response.json())
        .then(data => {

            setPaymentDetails(prevPaymentDetails => ({
                ...prevPaymentDetails,
                outstandingAmount: data.outstandingAmount,
                customAmount: 0,
                total: 0,
            }));

            handleStaffData();
            setSelectedStaff(null);
            setPaymentDetails({
                staffId: '',
                date: new Date().toISOString().split('T')[0],
                modeofPayment: '',
                customAmount: 0,
                payableAmount: 0,
                outstandingAmount: 0,
                subTotal: 0,
                total: 0,
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handlePaySalaryClick = (staff) => {
        const billingCycle = staff.billingCycle;
        const selectedDate = new Date(paymentDetails.date);
        const billingDate = new Date(staff.billingDate);
        let nextBillingDate = new Date(billingDate);
        let payableAmount = 0;

        if (billingCycle === 'monthly') {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        } else if (billingCycle === 'quarterly') {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 3);
        }

        const salaryDetails = salaries[staff._id];
        const outstandingAmount = salaryDetails ? salaryDetails.outstandingAmount : 0;

        let subTotal = paymentDetails.subTotal || 0;
        const total = subTotal;

        if (!paymentDetails.payableAmountGenerated && selectedDate >= billingDate && selectedDate < nextBillingDate) {
            payableAmount = staff.amount;
            subTotal = payableAmount + outstandingAmount;

            const updatedPaymentDetails = {
                ...paymentDetails,
                staffId: staff._id,
                date: paymentDetails.date,
                payableAmount: payableAmount,
                outstandingAmount: outstandingAmount,
                subTotal: subTotal,
                total: subTotal,
                payableAmountGenerated: true,
            };

            if (paymentDetails.customAmount !== '') {
                const customAmount = parseFloat(paymentDetails.customAmount);
                updatedPaymentDetails.customAmount = customAmount;
                updatedPaymentDetails.outstandingAmount = outstandingAmount - customAmount;
            } else {
                updatedPaymentDetails.customAmount = parseFloat(updatedPaymentDetails.subTotal);
                updatedPaymentDetails.outstandingAmount = outstandingAmount - updatedPaymentDetails.subTotal;
            }

            setSelectedStaff(staff);
            setPaymentDetails(updatedPaymentDetails);
        } else {
            const updatedPaymentDetails = {
                ...paymentDetails,
                staffId: staff._id,
                date: paymentDetails.date,
                payableAmount: 0,
                outstandingAmount: outstandingAmount,
                subTotal: outstandingAmount,
                total: outstandingAmount,
                payableAmountGenerated: false,
            };

            updatedPaymentDetails.customAmount = 0;
            setSelectedStaff(staff);
            setPaymentDetails(updatedPaymentDetails);
        }
    };

    const handleSalaryDetails = (staffId) => {
        fetch(`${apiUrl}/api/getsalary/${staffId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch salary details');
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
    
                // Find the latest salary transaction (assuming it's the last one in the array)
                const latestSalary = data[data.length - 1];
    
                // Update salaries state with all transactions
                setSalaries(data);
    
                // Update paymentDetails with the latest outstandingAmount and subTotal
                setPaymentDetails(prevPaymentDetails => ({
                    ...prevPaymentDetails,
                    outstandingAmount: latestSalary.outstandingAmount,
                    subTotal: latestSalary.outstandingAmount, // Update subTotal with latest outstandingAmount
                    total: latestSalary.outstandingAmount, // Update total with latest outstandingAmount
                    // Update other fields as needed
                }));
            } else {
                console.error('No salary data found for staffId:', staffId);
                // Handle case where no salary data is found (optional)
            }
        })
        .catch(error => {
            console.error('Error fetching salary details:', error);
            // Handle fetch error (e.g., display error message, retry logic)
        });
    };
    
    
    
    
    
    
    


    return (
        <>
            <div className="row">
                <div className="col-sm-6">
                    <h4 className="mb-3">Staff Salary</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 d-flex grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="d-flex">
                                                    <div>
                                                        <div className="m-l-2">Name</div>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Designation</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffData?.length > 0 && staffData.map((val) => (
                                            <tr key={val._id}>
                                                <td>
                                                    <div className="d-flex">
                                                        <img
                                                            className="img-sm rounded-circle mb-md-0 mr-2"
                                                            src={userprofileImage}
                                                            alt="profile image"
                                                        />
                                                        <div>
                                                            <div className="mt-2">{val.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="mt-1">{val.staffType}</div>
                                                </td>
                                                <td>
                                                    <div className="mt-1">{val.amount}</div>
                                                </td>
                                                <td>
                                                    <div className="mt-1">{val.status}</div>
                                                </td>
                                                <td>
                                                    <button onClick={() => handlePaySalaryClick(val)}>Pay Salary</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-flex grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Pay Salary</h4>
                            {selectedStaff && (
                                <form>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={paymentDetails.date}
                                            onChange={handlePaymentChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Payable Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="payableAmount"
                                            value={paymentDetails.payableAmount}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Outstanding Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="outstandingAmount"
                                            value={paymentDetails.outstandingAmount}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sub Total</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="subTotal"
                                            value={paymentDetails.subTotal}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Custom Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="customAmount"
                                            value={paymentDetails.customAmount}
                                            onChange={handlePaymentChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Total</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="total"
                                            value={paymentDetails.total}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Mode of Payment</label>
                                        <select
                                            className="form-control"
                                            name="modeofPayment"
                                            value={paymentDetails.modeofPayment}
                                            onChange={handlePaymentChange}
                                        >
                                            <option value="">Select Mode</option>
                                            <option value="cash">Cash</option>
                                            <option value="online">Online</option>
                                        </select>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={() => handlePaySalary(selectedStaff._id)}>Submit</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffSalary;




