import React, { useState, useEffect } from "react";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0); // Initialize totalExpense state
  const token = sessionStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;

  const [newExpense, setNewExpense] = useState({
    amount: "",
    description: "",
    category: "",
  });

  const [showAll, setShowAll] = useState(false);

  const displayedExpenses = showAll ? expenses : expenses.slice(0, 4);

  const toggleView = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    // Fetch expenses from the server when the component mounts
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/getexpenses`, {
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
      console.log("Fetched data:", data); // Log the fetched data to inspect
      setExpenses(data); // Update expenses state with fetched data
      // Calculate total expense
      const total = data.reduce((acc, expense) => acc + expense.amount, 0);
      setTotalExpense(total);
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
     <div className="row">
     <div className="col-md-6">
      <h2>Expenses</h2>
      </div>
<div className="col-md-6">
<h2 >Total Expense: {totalExpense}</h2>
</div>     
     </div>

     <div className="row">
     <div className="col-md-6 mt-3">
      <h4>Last Transactions</h4>
      <ul className="list-group mt-2">
        {displayedExpenses.length > 0 ? (
          displayedExpenses.map((expense) => (
            <li key={expense._id} className="list-group-item">
              <div><strong>Amount:</strong> {expense.amount}</div>
              <div><strong>Description:</strong> {expense.description}</div>
              <div><strong>Category:</strong> {expense.category}</div>
              {expense.category === 'Salary' && (
                <div><strong>User ID:</strong> {expense.userId}</div>
              )}
            </li>
          ))
        ) : (
          <li className="list-group-item">No expenses found</li>
        )}
      </ul>
      {expenses.length > 4 && (
        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" onClick={toggleView}>
            {showAll ? 'Hide' : 'View More'}
          </button>
        </div>
      )}
    </div>

      <div className="col-md-6 mt-3">
  <h4>Add Expenses</h4>
  <form onSubmit={handleSubmit}>
    <div className="mt-2 w-100 ">
      <input
        className="form-control border-0"
        placeholder="Amount *"
        type="number"
        id="amount"
        name="amount"
        value={newExpense.amount}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mt-2 w-100">
      <input
        className="form-control border-0"
        placeholder="Category *"
        type="text"
        id="category"
        name="category"
        value={newExpense.category}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mt-2 w-100">
      <input
        className="form-control border-0"
        placeholder="Description"
        type="text"
        id="description"
        name="description"
        value={newExpense.description}
        onChange={handleChange}
      />
    </div>
    <div className="d-flex justify-content-end mt-3">
      <button className="btn btn-primary  w-100" type="submit">Submit</button>
    </div>
      </form>
</div>

     </div>


     
    </div>
  );
};

export default Expenses;
