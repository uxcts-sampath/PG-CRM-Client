import React from "react";

const Income = () => {
  return <div>Income List</div>;
};

export default Income;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Income() {
//   const [incomeEntries, setIncomeEntries] = useState([]);
//   const [newEntry, setNewEntry] = useState({
//     depositType: "",
//     amount: 0,
//     payThrough: "",
//     paymentMode: "",
//     totalAmount: 0,
//     dueAmount: 0,
//   });

//   useEffect(() => {
//     // Fetch income entries using user ID from JWT token
//     const userId = getUserIdFromToken(); // Implement your function to get user ID from token
//     if (userId) {
//       fetchIncomeEntries(userId);
//     }
//   }, []);

//   const fetchIncomeEntries = async (userId) => {
//     try {
//       const response = await axios.get(`/api/pgincome?userId=${userId}`);
//       setIncomeEntries(response.data);
//     } catch (error) {
//       console.error("Error fetching income entries:", error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEntry({ ...newEntry, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userId = getUserIdFromToken(); // Implement your function to get user ID from token
//       if (userId) {
//         await axios.post(`/api/pgincome`, { ...newEntry, userId });
//         setNewEntry({
//           depositType: "",
//           amount: 0,
//           payThrough: "",
//           paymentMode: "",
//           totalAmount: 0,
//           dueAmount: 0,
//         });
//         fetchIncomeEntries(userId);
//       }
//     } catch (error) {
//       console.error("Error adding income entry:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Hostel Income Entries</h1>
//       <div>
//         <h2>Add New Entry</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Deposit Type:</label>
//             <input
//               type="text"
//               name="depositType"
//               value={newEntry.depositType}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label>Amount:</label>
//             <input
//               type="number"
//               name="amount"
//               value={newEntry.amount}
//               onChange={handleInputChange}
//             />
//           </div>
//           {/* Add more input fields for other properties */}
//           <button type="submit">Add Entry</button>
//         </form>
//       </div>
//       <div>
//         <h2>Income Entries List</h2>
//         <ul>
//           {incomeEntries.map((entry) => (
//             <li key={entry._id}>
//               <div>Deposit Type: {entry.depositType}</div>
//               <div>Amount: {entry.amount}</div>
//               {/* Display other entry properties */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Income;
