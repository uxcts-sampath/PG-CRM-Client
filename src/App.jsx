import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./auth/Forgotpassword";
import { useAuth } from "./components/AuthContext";
import ResetPassword from "./auth/ResetPassword";
import MemberShipModal from "./components/MemberShipModal";

const App = () => {
  const { isAuthenticated, signin } = useAuth();

  // const [openWelcomeModal, setOpenWelcomeModal] = useState(true);
  // const modalCLose = () => {
  //   setOpenWelcomeModal(false);
  // }
  // console.log(openWelcomeModal, 'openWelcomeModal');

  return (
    <>
      {/* <MemberShipModal openWelcomeModal={openWelcomeModal} setOpenWelcomeModal={setOpenWelcomeModal} modalCLose={modalCLose}/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onSignin={signin} />} />
          <Route path="/home/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:userId/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
