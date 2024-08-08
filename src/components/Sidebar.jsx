import React from "react";
import { useNavigate } from "react-router-dom";
import userprofileImage from "/theme/images/faces/face29.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const hostelName = sessionStorage.getItem("hostelName");
  const userType = sessionStorage.getItem("userType");

  return (
    <>
      <div className="theme-setting-wrapper">
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close typcn typcn-delete-outline"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div className="sidebar-bg-options selected" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles primary"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default border"></div>
          </div>
        </div>
      </div>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <div className="d-flex sidebar-profile">
              <div className="sidebar-profile-image">
                <img src={userprofileImage} alt="User Profile" />
                <span className="sidebar-status-indicator"></span>
              </div>
              <div className="sidebar-profile-name">
                {/* <p className="sidebar-name">{hostelName}</p> */}
                <p className="sidebar-name">
                  {userType === "user" ? hostelName : "admin"}
                </p>
                <p className="sidebar-designation">Welcome</p>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/home")}
            >
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>

          {userType === "user" ? (
            <>
              {/* User-specific menu items */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <i className="typcn typcn-briefcase menu-icon"></i>
                  <span className="menu-title">PG Settings</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("pgsetup")}
                      >
                        Setup
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("profile")}
                      >
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("membership")}
                      >
                        Membership
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#form-elements"
                  aria-expanded="false"
                  aria-controls="form-elements"
                >
                  <i className="typcn typcn-film menu-icon"></i>
                  <span className="menu-title">PG Users</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="form-elements">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("pgusers")}
                      >
                        User
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("upcomingfeelist")}
                      >
                        Upcoming Fee list
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("pgusers/payusers")}
                      >
                        Pay User Fee
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#staff"
                  aria-expanded="false"
                  aria-controls="form-elements"
                >
                  <i className="typcn typcn-film menu-icon"></i>
                  <span className="menu-title">PG Staff</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="staff">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("pgstaff")}
                      >
                        Staff
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => navigate("pgstaff/rollmanagement")}
                        style={{ cursor: "pointer" }}
                      >
                        Roll Management
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => navigate("pgstaff/salary")}
                        style={{ cursor: "pointer" }}
                      >
                        Salary
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#charts"
                  aria-expanded="false"
                  aria-controls="charts"
                >
                  <i className="typcn typcn-chart-pie-outline menu-icon"></i>
                  <span className="menu-title">Finance</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="charts">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("incomes")}
                      >
                        Incomes
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("expenses")}
                      >
                        Expenses
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#tables"
                  aria-expanded="false"
                  aria-controls="tables"
                >
                  <i className="typcn typcn-th-small-outline menu-icon"></i>
                  <span className="menu-title">Attendance</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="tables">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => navigate("staffattendance")}
                        style={{ cursor: "pointer" }}
                      >
                        Staff Attendance
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <>
              {/* Admin-specific menu items */}
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#admin-dashboard"
                  aria-expanded="false"
                  aria-controls="admin-dashboard"
                >
                  <i className="typcn typcn-device-laptop menu-icon"></i>
                  <span className="menu-title">Admin Dashboard</span>
                  {/* <i className="menu-arrow"></i> */}
                </a>
                <div className="collapse" id="admin-dashboard">
                  {/* <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("admin/reports")}
                      >
                        Reports
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("admin/usermanagement")}
                      >
                        User Management
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("admin/settings")}
                      >
                        Settings
                      </a>
                    </li>
                  </ul> */}
                </div>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="admin-hostels" >
            <span className="menu-title">Hostels</span> </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="admin-users" >
            <span className="menu-title">Users</span> </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
