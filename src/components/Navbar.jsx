import React from "react";
import {  useNavigate } from "react-router-dom";
import logoWt from "/images/logo-wt.png";

const Navbar = () => {

  const navigate=useNavigate()
  const token = sessionStorage.getItem("token");

  const userName=sessionStorage.getItem("userName")
  const handleLogout = () => {
    // Clear the token from sessionStorage
    sessionStorage.removeItem("token");

    // Redirect to the home page after successful logout
    navigate("/");
  };
  
  // const handleSignOut=()=>{
  //   navigate('/')
  // }

  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="index.html">
            <img src={logoWt} alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src={logoWt} alt="logo" />
          </a>
          <button
            className="navbar-toggler navbar-toggler align-self-center d-none d-lg-flex"
            type="button"
            data-toggle="minimize"
          >
            <span className="typcn typcn-th-menu"></span>
          </button>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item  d-none d-lg-flex">
              <a className="nav-link" href="#">
                Calendar
              </a>
            </li>
            <li className="nav-item  d-none d-lg-flex">
              <a className="nav-link active" href="#">
                Statistic
              </a>
            </li>
            <li className="nav-item  d-none d-lg-flex">
              <a className="nav-link" href="#">
                Employee
              </a>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item d-none d-lg-flex  mr-2">
              <a className="nav-link" href="#">
                Help
              </a>
            </li>
            <li className="nav-item dropdown d-flex">
              <a
                className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                id="messageDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <i className="typcn typcn-message-typing"></i>
                <span className="count bg-success">2</span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="messageDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Messages
                </p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="images/faces/face4.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      David Grey
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      The meeting is cancelled
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="images/faces/face2.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      Tim Cook
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      New product launch
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <img
                      src="images/faces/face3.jpg"
                      alt="image"
                      className="profile-pic"
                    />
                  </div>
                  <div className="preview-item-content flex-grow">
                    <h6 className="preview-subject ellipsis font-weight-normal">
                      {" "}
                      Johnson
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      Upcoming board meeting
                    </p>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown  d-flex">
              <a
                className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center"
                id="notificationDropdown"
                href="#"
                data-toggle="dropdown"
              >
                <i className="typcn typcn-bell mr-0"></i>
                <span className="count bg-danger">2</span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                aria-labelledby="notificationDropdown"
              >
                <p className="mb-0 font-weight-normal float-left dropdown-header">
                  Notifications
                </p>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="typcn typcn-info-large mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      Just now
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                      <i className="typcn typcn-cog mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      Private message
                    </p>
                  </div>
                </a>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-info">
                      <i className="typcn typcn-user-outline mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      New user registration
                    </h6>
                    <p className="font-weight-light small-text mb-0">
                      2 days ago
                    </p>
                  </div>
                </a>
              </div>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link dropdown-toggle  pl-0 pr-0"
                href="#"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                <i className="typcn typcn-user-outline mr-0"></i>
                <span className="nav-profile-name">{userName}</span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <a className="dropdown-item">
                  <i className="typcn typcn-cog text-primary"></i>
                  Settings
                </a>
                <a className="dropdown-item" onClick={handleLogout}>
                  <i className="typcn typcn-power text-primary"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="typcn typcn-th-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
