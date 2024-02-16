import React from "react";

import UpcomingFeeList from "../pages/pgusers/UpcomingFeeList";

const Home = () => {

  const userName=sessionStorage.getItem("userName")

  return (
    <>
      <div className="row">
        <div className="col-sm-6">
          <h2 className="mb-0">Welcome <span className=" text-secondary">{userName}</span></h2>
          <p className="small mt-1">Hope you are doing good..</p>
        </div>
        <div className="col-sm-6">
          <div className="d-flex align-items-center justify-content-md-end">
            <div className="mb-3 mb-xl-0 pr-1">
              <div className="dropdown">
                <button
                  className="btn bg-white btn-sm dropdown-toggle btn-icon-text border mr-2"
                  type="button"
                  id="dropdownMenu3"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="typcn typcn-calendar-outline mr-2"></i>Last 7
                  days
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuSizeButton3"
                  data-x-placement="top-start"
                >
                  <h6 className="dropdown-header">Last 14 days</h6>
                  <a className="dropdown-item" href="#">
                    Last 21 days
                  </a>
                  <a className="dropdown-item" href="#">
                    Last 28 days
                  </a>
                </div>
              </div>
            </div>
            <div className="pr-1 mb-3 mr-2 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm bg-white btn-icon-text border"
              >
                <i className="typcn typcn-arrow-forward-outline mr-2"></i>Export
              </button>
            </div>
            <div className="pr-1 mb-3 mb-xl-0">
              <button
                type="button"
                className="btn btn-sm bg-white btn-icon-text border"
              >
                <i className="typcn typcn-info-large-outline mr-2"></i>info
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row  mt-3">
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">Rooms</h5>
                  </div>
                  <div className="col-lg-12">Avaliable - 6</div>
                  <div className="col-lg-12">Occipied - 12</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="card-title mb-3">Beds</h4>
                  </div>
                  <div className="col-lg-12">Avaliable - 30</div>
                  <div className="col-lg-12">Occipied - 60</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h4 className="card-title mb-3">Users</h4>
                  </div>
                  <div className="col-lg-12">Open - 30</div>
                  <div className="col-lg-12">Occipied - 60</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 d-flex grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between">
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="card-title mb-3">Revenue</h5>
                  </div>
                  <div className="col-lg-12">Income - 20000</div>
                  <div className="col-lg-12">Expensess - 12000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpcomingFeeList />
    </>
  );
};

export default Home;
