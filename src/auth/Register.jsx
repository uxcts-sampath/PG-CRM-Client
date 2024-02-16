import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import logoWt from "/images/logo-wt.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelName: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    city: "",
    country: "",
    password: "",
    aadharNumber:"",
    userSize:""
  });

  const [errors, setErrors] = useState({
    hostelName: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    city: "",
    country: "",
    password: "",
    aadharNumber:"",
    userSize:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateInput = () => {
    let hasErrors = false;
    const newErrors = { firstName: "", lastName: "" };

    // Perform your validation logic here
    // For example, checking if the first name is not empty
    if (formData.hostelName.trim() === "") {
      newErrors.hostelName = "User Name is required";
      hasErrors = true;
    }
    if (formData.fullName.trim() === "") {
      newErrors.fullName = "Full Name is required";
      hasErrors = true;
    }
    if (formData.dateOfBirth.trim() === "") {
      newErrors.dateOfBirth = "Date of Birth is required";
      hasErrors = true;
    }
    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required";
      hasErrors = true;
    }
    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      hasErrors = true;
    }
    if (formData.address.trim() === "") {
      newErrors.address = "Address is required";
      hasErrors = true;
    }
    if (formData.state.trim() === "") {
      newErrors.state = "State is required";
      hasErrors = true;
    }
    if (formData.city.trim() === "") {
      newErrors.city = "City is required";
      hasErrors = true;
    }
    if (formData.country.trim() === "") {
      newErrors.country = "Country is required";
      hasErrors = true;
    }

    if (formData.password.trim() === "") {
      newErrors.password = "Password is required";
      hasErrors = true;
    }
    if (formData.aadharNumber.trim() === "") {
      newErrors.aadharNumber = "aadharNumber Number is required";
      hasErrors = true;
    }
    if (formData.userSize.trim() === "") {
      newErrors.userSize = "User Size is required";
      hasErrors = true;
    }

    setErrors(newErrors);
    return hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    if (validateInput()) {
      console.log("Form has validation errors. Cannot submit.");
      return;
    }

    try {
      // Send data to the backend using Axios
      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/");
      } else {
        console.log(
          "Registration failed",
          response.status,
          response.statusText
        );
        // Handle error
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
   
    console.log("Form Data:", formData);

   
  };

  return (
    <div>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper p-0 m-0  auth">
            <div className="row w-100 register-bgimg">
              <div className="col-lg-8">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src={logoWt} alt="logo" />
                  </div>
                  <h4>New here? </h4>
                  <h6 className="font-weight-light">
                    Signing up is easy. It only takes a few steps{" "}
                  </h6>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Hostel Name
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              name="hostelName"
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            {errors.hostelName && (
                              <div className="text-danger">
                                {errors.hostelName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Full Name
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              name="fullName"
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            {errors.fullName && (
                              <div className="text-danger">
                                {errors.fullName}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Date of Birth
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="date"
                              className="form-control"
                              name="dateOfBirth" // Change the name to "dob" for Date of Birth
                              onChange={handleInputChange}
                            />
                            {errors.dateOfBirth && (
                              <div className="text-danger">
                                {errors.dateOfBirth}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Mobile Number
                          </label>
                          <div className="col-sm-8">
                            <input
                              className="form-control"
                              name="phoneNumber"
                              onChange={handleInputChange}
                            />
                            {errors.phoneNumber && (
                              <div className="text-danger">
                                {errors.phoneNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Address
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              onChange={handleInputChange}
                            />
                            {errors.address && (
                              <div className="text-danger">
                                {errors.address}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            State
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              onChange={handleInputChange}
                            />
                            {errors.state && (
                              <div className="text-danger">{errors.state}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            City
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              name="city"
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            {errors.city && (
                              <div className="text-danger">{errors.city}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Country
                          </label>
                          <div className="col-sm-8">
                            <select
                              className="form-control"
                              name="country"
                              onChange={handleInputChange}
                            >
                              <option>select country</option>
                              <option>India</option>
                              <option>UK</option>
                              <option>USA</option>
                            </select>
                            {errors.country && (
                              <div className="text-danger">
                                {errors.country}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Aadhar Number
                          </label>
                          <div className="col-sm-8">
                            <input
                             type="text"
                              name="aadharNumber"
                              className="form-control"
                              onChange={handleInputChange}
                            />
                            {errors.aadharNumber && (
                              <div className="text-danger">{errors.aadharNumber}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label" >
                            User Size
                          </label>
                          <div className="col-sm-8">
                          <select
                              className="form-control"
                              name="userSize"
                              onChange={handleInputChange}
                            >
                              <option>select user size</option>
                              <option>1-50</option>
                              <option>51-250</option>
                              <option>251-500</option>
                            </select>

                            {errors.userSize && (
                              <div className="text-danger">
                                {errors.userSize}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Email
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="email"
                              onChange={handleInputChange}
                            />
                            {errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group row">
                          <label className="col-sm-4 col-form-label">
                            Password
                          </label>
                          <div className="col-sm-8">
                            <input
                              type="text"
                              className="form-control"
                              name="password"
                              onChange={handleInputChange}
                            />
                            {errors.password && (
                              <div className="text-danger">
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mt-3 row">
                      <div className="col-sm-8 offset-sm-4">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>

                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          Keep me signed in
                        </label>
                      </div>
                      <a href="#" className="auth-link text-black">
                        Forgot password?
                      </a>
                    </div>

                    <div className="text-center mt-4 font-weight-light">
                      Have an account?{" "}
                      <a href="/" className="text-primary">
                        Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
