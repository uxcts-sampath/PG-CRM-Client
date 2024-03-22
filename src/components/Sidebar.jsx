import React from "react";
import { useNavigate } from "react-router-dom";
import userprofileImage from "/theme/images/faces/face29.png";

const Sidebar = () => {

  const navigate=useNavigate()

  const hostelName=sessionStorage.getItem("hostelName")

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
                <img src={userprofileImage} alt="image" />
                <span className="sidebar-status-indicator"></span>
              </div>
              <div className="sidebar-profile-name">
                <p className="sidebar-name">{hostelName}</p>
                <p className="sidebar-designation">Welcome</p>
              </div>
            </div>
            {/* <div className="nav-search">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type to search..."
                  aria-label="search"
                  aria-describedby="search"
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="search">
                    <i className="typcn typcn-zoom"></i>
                  </span>
                </div>
              </div>
            </div> */}
            {/* <p className="sidebar-menu-title">Dash menu</p> */}
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{cursor:"pointer"}} onClick={()=>navigate('/home')}>
              <i className="typcn typcn-device-desktop menu-icon"></i>
              <span className="menu-title" >
                Dashboard
                {/* <span className="badge badge-primary ml-3">New</span> */}
              </span>
            </a>
          </li>
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
              {/* <i className="typcn typcn-chevron-right menu-arrow"></i> */}
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" style={{cursor:'pointer'}} onClick={()=>navigate('pgsetup')}>
                    Setup
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" style={{cursor:'pointer'}} onClick={()=>navigate('profile')}>
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" style={{cursor:'pointer'}} onClick={()=>navigate('membership')}
                  >
                    Membership
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a
                    className="nav-link"
                    style={{cursor:'pointer'}} onClick={()=>navigate('department')}
                  >
                   Department
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
                  <a className="nav-link" style={{cursor:'pointer'}}  onClick={()=>navigate('pgusers')}>
                    User
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    style={{cursor:'pointer'}} onClick={()=>navigate('upcomingfeelist')}
                  >
                    Upcoming Fee list
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
                    style={{cursor:'pointer'}}  onClick={()=>navigate('pgstaff')}
                  >
                    Staff
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="pages/forms/basic_elements.html"
                  >
                    Roll Managment
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="pages/forms/basic_elements.html"
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
                  {" "}
                  <a className="nav-link" style={{cursor:'pointer'}}  onClick={()=>navigate('incomes')}>
                    Incomes
                  </a>
                </li>
              </ul>
            </div>
            <div className="collapse" id="charts">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" style={{cursor:'pointer'}}  onClick={()=>navigate('expenses')}>
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
                  {" "}
                  <a className="nav-link" href="pages/tables/basic-table.html">
                    Staff Attendance
                  </a>
                </li>
              </ul>
            </div>
          </li>
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#icons"
              aria-expanded="false"
              aria-controls="icons"
            >
              <i className="typcn typcn-compass menu-icon"></i>
              <span className="menu-title">Icons</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="icons">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="pages/icons/mdi.html">
                    Mdi icons
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#auth"
              aria-expanded="false"
              aria-controls="auth"
            >
              <i className="typcn typcn-user-add-outline menu-icon"></i>
              <span className="menu-title">User Pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="auth">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="pages/samples/login.html">
                    {" "}
                    Login{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="pages/samples/register.html">
                    {" "}
                    Register{" "}
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="collapse"
              href="#error"
              aria-expanded="false"
              aria-controls="error"
            >
              <i className="typcn typcn-globe-outline menu-icon"></i>
              <span className="menu-title">Error pages</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="error">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="pages/samples/error-404.html">
                    {" "}
                    404{" "}
                  </a>
                </li>
                <li className="nav-item">
                  {" "}
                  <a className="nav-link" href="pages/samples/error-500.html">
                    {" "}
                    500{" "}
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="pages/documentation/documentation.html"
            >
              <i className="typcn typcn-document-text menu-icon"></i>
              <span className="menu-title">Documentation</span>
            </a>
          </li> */}
        </ul>
        {/* <ul className="sidebar-legend">
          <li>
            <p className="sidebar-menu-title">Category</p>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              #Sales
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              #Marketing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              #Growth
            </a>
          </li>
        </ul> */}
      </nav>
    </>
  );
};

export default Sidebar;
