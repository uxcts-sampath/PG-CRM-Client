import React, { useState, useEffect } from "react";

const Income = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [incomeData, setIncomeData] = useState({ paymentRecords: [], totalIncome: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState("month");
const [date, setDate] = useState(() => {
  const today = new Date().toISOString().substr(0, 10);
  return today;
});
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchIncomeRecords = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/income?type=${type}&date=${date}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
    <div className="container">
      <div className="d-flex justify-content-between mb-2">
      <h2>Income Records</h2>
      <h2>Total Income: {incomeData.totalIncome}</h2>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="type" className="form-label">Type:</label>
          <select id="type" className="form-select" style={{ width: '70%',height:'40px' }} value={type} onChange={handleTypeChange}>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div className="col-md-3 d-flex align-items-center">
          <label htmlFor="date" className="form-label text-center">Date:</label>
          <input type="date" id="date" className="form-control" value={date} onChange={handleDateChange} />
        </div>
      </div>
      <table className="table">
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
