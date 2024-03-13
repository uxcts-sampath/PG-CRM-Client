import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./auth/Forgotpassword";
import { useAuth } from "./components/AuthContext";
import ResetPassword from "./auth/ResetPassword";

const App = () => {
  const { isAuthenticated, signin } = useAuth();
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login onSignin={signin} />}/>
        <Route path="/home/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:userId/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
