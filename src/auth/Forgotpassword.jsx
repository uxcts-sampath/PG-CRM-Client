import React from "react";

import logoWt from "/images/logo-wt.png";

const Forgotpassword = () => {
  return (
    <>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src={logoWt} alt="logo" />
                  </div>
                  <h4>Forgot Password</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id=""
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="mt-3">
                      <a
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                        href="#"
                      >
                        Recover Passwrod
                      </a>
                    </div>

                    <div className="text-center mt-4 font-weight-light">
                      Dont have an account?{" "}
                      <a href="/register" className="text-primary">
                        Create
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
