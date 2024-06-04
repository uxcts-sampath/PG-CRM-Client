import React, { useState, useEffect } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const token = sessionStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;

  const [newExpense, setNewExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // Fetch expenses from the server when the component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/getexpenses`,{
        method: 'GET',
        headers: {  
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/createexpense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newExpense),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setNewExpense({ amount: "", description: "", category: "" });
      fetchExpenses(); // Refresh expense list after adding a new expense
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newExpense.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newExpense.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={newExpense.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
      <h2>Expenses List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            <div>Amount: {expense.amount}</div>
            <div>Description: {expense.description}</div>
            <div>Category: {expense.category}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
