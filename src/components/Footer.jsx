import React from "react";

const Footer = () => {
  return (
    <>
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-center text-sm-left d-block d-sm-inline-block">
          BoarderBase
        </span>
        <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
          {" "}
          Copyright ©{" "}
          <a href="https://www.uxcts.com/" target="_blank">
            Connect UX Technology Solutions Pvt Ltd
          </a>{" "}
          2024
        </span>
      </div>
    </>
  );
};

export default Footer;
