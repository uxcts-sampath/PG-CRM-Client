// import React,{useState,useEffect} from 'react'
// import {  useNavigate } from "react-router-dom";
// import userprofileImage from "/theme/images/faces/face29.png";


// const StaffSalary = () => {

//   const navigate=useNavigate()
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const userId = sessionStorage.getItem("userId")


//   const token = sessionStorage.getItem("token")
//   const [staffData,setStaffData]=useState([])


//   const handleStaffData = () => {
//     fetch(`${apiUrl}/api/getallstaff`, {
//         method: 'GET', 
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`
//         },
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
    
//       setStaffData(data)
//     })
//     .catch(error => {
//         // Handle errors occurred during fetch
//         console.error('Error:', error);
//     });
// }

// console.log(staffData)


 


// useEffect(()=>{
//   handleStaffData()
// },[])

//   return (
//     <>
//        <div className="row">
//         <div className="col-sm-6">
//           <h4 className="mb-3">Staff Salary</h4>
//         </div>
//       </div>

//   <div className="row">
//         <div className="col-lg-6 d-flex grid-margin stretch-card">
//           <div className="card">
//             <div className="card-body">
             


//               <div className="table-responsive">
//               <table className="table">
//                   <thead>
//                     <tr>
//                       <th>
//                         <div className="d-flex">
//                           <div>
//                             <div className="m-l-2"> Name</div>
//                           </div>
//                         </div>
//                       </th>
                      

//                       <th>Designation</th>

//                       <th>Amount</th>

//                       <th>Status</th>

//                       <th>Mode</th>
                    
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {staffData?.length > 0 && staffData?.map((val) => (
//                     <tr key={val._id}>
//                         <td>
//                         <div className="d-flex">
//                             <img
//                             className="img-sm rounded-circle mb-md-0 mr-2"
//                             src={userprofileImage}
//                             alt="profile image"
//                             />
//                             <div>
//                             <div className="mt-2">{val.name}</div>
//                             </div>
//                         </div>
//                         </td>
//                         <td>
//                         <div className="mt-1">{val.staffType}</div>
//                         </td>

//                         <td>
//                         <div className="mt-1">{val.amount}</div>
//                         </td>
//                         <td>
//                         <div className="mt-1">{val.status}</div>
//                         </td>
//                         <td>
//                             <button>Pay Salary</button>
//                         </td>
                    
//                     </tr>
//                  ))}                
//              </tbody>
//               </table>
//                 </div>
//                 </div>
//                     </div>
//                         </div>
//         <div className="col-lg-6 d-flex grid-margin stretch-card">

//         </div>

//       </div>

//       </>
//   )
// }

// export default StaffSalary




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
        date: '',
        total: '',
        modeofPayment: '',
        subTotal: '',
        customAmount: '',
        payableAmount: '',
        outstandingAmount: ''
    });

    const handleStaffData = () => {
        fetch(`${apiUrl}/api/getallstaff`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setStaffData(data);
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
        const paymentData = { ...paymentDetails, staff: staffId };

        fetch(`${apiUrl}/api/paysalary/${staffId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Salary paid successfully:', data);
            handleStaffData(); // Refresh staff data to update status
            setSelectedStaff(null); // Reset the selected staff after payment
            setPaymentDetails({
                staffId: '',
                date: '',
                total: '',
                modeofPayment: '',
                subTotal: '',
                customAmount: '',
                payableAmount: '',
                outstandingAmount: ''
            }); // Reset payment details after payment
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handlePaySalaryClick = (staff) => {
        const billingCycle = staff.billingCycle;
        const currentDate = new Date();
        const billingDate = new Date(staff.billingDate);
        let nextBillingDate;
        let payableAmount = 0;
        let outstandingAmount = 0;
        let showOutstanding = true;
    
        if (billingCycle === 'monthly') {
            nextBillingDate = new Date(billingDate);
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        } else if (billingCycle === 'yearly') {
            nextBillingDate = new Date(billingDate);
            nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
        }
    
        // Check if it's the first payment in the current billing cycle
        if (currentDate >= billingDate && currentDate < nextBillingDate) {
            payableAmount = staff.amount;
            showOutstanding = false;
        }
    
        outstandingAmount = staff.amount - payableAmount;
    
        setSelectedStaff(staff);
        setPaymentDetails({
            staffId: staff._id,
            date: '',
            total: '',
            modeofPayment: '',
            subTotal: '',
            customAmount: '',
            payableAmount: showOutstanding ? 0 : payableAmount,
            outstandingAmount: showOutstanding ? outstandingAmount : 0
        });
    };
    
    
    useEffect(() => {
        handleStaffData();
    }, []);

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
                    {/* Payment Form */}
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
                                            onChange={handlePaymentChange}
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
                                            onChange={handlePaymentChange}
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
                                            onChange={handlePaymentChange}
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
                                            onChange={handlePaymentChange}
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


