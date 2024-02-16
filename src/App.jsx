import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Forgotpassword from "./auth/Forgotpassword";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./components/AuthContext";

const App = () => {
  const { isAuthenticated, signin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home/*"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        {/* <Route path="/home/*" element={<Dashboard/>} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/" element={<Login onSignin={signin} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
