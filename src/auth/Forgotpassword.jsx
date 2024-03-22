import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoWt from "/images/logo-wt.png";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setMessage("Check your email for further instructions.");
    } catch (error) {
      setMessage(error.message);
    }
  };

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
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id=""
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        Reset Password
                      </button>
                    </div>
                    {message && typeof message === 'string' ? (
                        <p className="text-danger text-center">{message}</p>
                      ) : (
                        <p className="text-danger text-center">{message.message}</p>
                      )}

                    <div className="text-center mt-4 font-weight-light">
                      Don't have an account?{" "}
                      <button
                        onClick={() => navigate("/register")}
                        className="text-primary"
                      >
                        Create
                      </button>
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
