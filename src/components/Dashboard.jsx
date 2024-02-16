import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Footer from "./Footer";
import Pgsetup from "./../pages/PgSetup";
import PgUsers from "./../pages/pgusers/PgUsers";

const Dashboard = () => {
  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Home />
             

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
