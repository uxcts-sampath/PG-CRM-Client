import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import logoWt from "/images/logo-wt.png";

const ResetPassword = () => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const { userId, token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        console.log("userId:", userId);
        console.log("token:", token);
    }, [userId, token]);

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters long.");
            }
    
            const response = await fetch(`${apiUrl}/api/resetpassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, token, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
    
            setMessage("Password reset successful");
            navigate('/');
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
                                    <h4>Reset Your Password</h4>
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id=""
                                                placeholder="Enter Your New Password"
                                                value={password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                                                Reset Password
                                            </button>
                                        </div>

                                        {message && <div className="mt-3 text-danger">{message}</div>}

                                        <div className="text-center mt-4 font-weight-light">
                                            Dont have an account?{" "}
                                            <a className="text-primary">
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
    )
}

export default ResetPassword;
