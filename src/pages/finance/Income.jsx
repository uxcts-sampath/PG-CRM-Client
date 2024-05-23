import React, { useState, useEffect } from "react";

const Income = () => {
  const [incomeData, setIncomeData] = useState({ paymentRecords: [], totalIncome: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("month");
  const [date, setDate] = useState("2024-05-23");

  const token = sessionStorage.getItem("token");


  useEffect(() => {
    const fetchIncomeRecords = async () => {
      try {
        // Make a GET request to your backend API to fetch income records based on selected type and date
        const response = await fetch(`http://localhost:3000/api/income?type=${type}&date=${date}`,{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming your backend returns paymentRecords and totalIncome in the response
        setIncomeData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchIncomeRecords();
  }, [type, date]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <h1>Income Records</h1>
    <div>
      <label htmlFor="type">Type:</label>
      <select id="type" value={type} onChange={handleTypeChange}>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
      </select>
    </div>
    <div>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" value={date} onChange={handleDateChange} />
    </div>
    <h2>Total Income: {incomeData.totalIncome}</h2>
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>Billing Date</th>
          <th>Payment</th>
          <th>Outstanding</th>
          <th>Amount Paid</th>
        </tr>
      </thead>
      <tbody>
        {incomeData.paymentRecords.map((record) => (
          <tr key={record.userId}>
            <td>{record.userId}</td>
            <td>{record.billingDate}</td>
            <td>{record.payment}</td>
            <td>{record.outstanding}</td>
            <td>{record.amountPaid}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Income;
