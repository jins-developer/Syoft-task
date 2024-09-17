import React, { useState } from "react";
import style from "./SignUp.module.css";
import logo from "../../assets/Images/logo.png";
import { FaCircle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const SignUp = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [fistName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [errors, setErrors] = useState({
    first_name: "",
    email: "",
    phone: "",
    password: "",
    apiError: "",
  });
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let valid = true;
    let nameError = "";
    let emailError = "";
    let phoneError = "";
    let passwordError = "";

    if (!fistName) {
      nameError = "First name is required";
      valid = false;
    }

    if (!email) {
      emailError = "Email is required";
      valid = false;
    }
    if (!phoneNumber) {
      phoneError = "Phone number is required";
      valid = false;
    }

    if (!password) {
      passwordError = "Password is required";
      valid = false;
    }

    setErrors({
      first_name: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      apiError: "",
    });
    return valid;
  };
  async function register() {
    if (validateInputs()) {
      setLoading(true);
      await fetch(`${url}/user_registeration/api/user_registeration`, {
        method: "POST",
        body: JSON.stringify({
          user_firstname: fistName,
          user_lastname: secondName,
          user_email: email,
          user_phone: phoneNumber,
          user_password: password,
          city: city,
          zipcode: zipCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === true) {
            setLoading(false);
            navigate("/");
            localStorage.setItem("userData", JSON.stringify(data.user_data));
          } else {
            setLoading(false);
            setErrors({ email: "", password: "", apiError: data.msg });
          }
        });
    }
  }

  return (
    <div className={style.container}>
      {loading && <Loader />}
      <div className={style.registerFirstContainer}>
        <div className={style.registerSecondContainer}>
          <div className={style.containerLeft}>
            <div className={style.leftHeader}>
              <p>Welcome to syoft</p>
              <FaCircle />
            </div>
            <div className={style.leftSecondHeader}>
              {errors.apiError ? (
                <p style={{ color: "#fe1818" }}>{errors.apiError}</p>
              ) : (
                <p>Sign Up</p>
              )}
            </div>
            <div className={style.leftInputContainer}>
              <div className={style.inputSection}>
                <div className={style.firstInputValue}>
                  {errors.first_name ? (
                    <p>{errors.first_name}</p>
                  ) : (
                    <label htmlFor="first_name">First name*</label>
                  )}
                  <input
                    autoComplete="off"
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter first name"
                    value={fistName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors({ ...errors, first_name: "", apiError: "" });
                    }}
                    style={{
                      borderColor: errors.first_name ? " #fe1818" : " #d3d3d3",
                    }}
                  />
                </div>
                <div className={style.secondInputValue}>
                  <label htmlFor="second_name">Second name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="second_name"
                    id="second_name"
                    placeholder="Enter second name"
                    value={secondName}
                    onChange={(e) => {
                      setSecondName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={style.inputSection}>
                <div className={style.firstInputValue}>
                  {errors.email ? (
                    <p>{errors.email}</p>
                  ) : (
                    <label htmlFor="email">Email*</label>
                  )}
                  <input
                    autoComplete="off"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "", apiError: "" });
                    }}
                    style={{
                      borderColor: errors.email ? " #fe1818" : " #d3d3d3",
                    }}
                  />
                </div>
                <div className={style.secondInputValue}>
                  {errors.phone ? (
                    <p>{errors.phone}</p>
                  ) : (
                    <label htmlFor="phone">Phone number*</label>
                  )}
                  <input
                    autoComplete="off"
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="Enter phone"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setErrors({ ...errors, phone: "", apiError: "" });
                    }}
                    style={{
                      borderColor: errors.phone ? " #fe1818" : " #d3d3d3",
                    }}
                  />
                </div>
              </div>
              <div className={style.inputSection}>
                <div className={style.firstInputValue}>
                  {errors.password ? (
                    <p>{errors.password}</p>
                  ) : (
                    <label htmlFor="password">Password* </label>
                  )}
                  <div className={style.passwordInput}>
                    <input
                      autoComplete="off"
                      type={passwordView ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "", apiError: "" });
                      }}
                      style={{
                        borderColor: errors.password ? " #fe1818" : " #d3d3d3",
                      }}
                    />
                    {passwordView ? (
                      <AiOutlineEye
                        onClick={() => {
                          setPasswordView(!passwordView);
                        }}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => {
                          setPasswordView(!passwordView);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className={style.secondInputValue}>
                  <label htmlFor="city">City </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className={style.inputSection}>
                <div className={style.firstInputValue}>
                  <label htmlFor="code">Zip code </label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Enter zip code"
                    value={zipCode}
                    onChange={(e) => {
                      setZipCode(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={style.registerButton}>
              <button
                onClick={() => {
                  register();
                }}
              >
                Register
              </button>
            </div>
            <div className={style.loginContainer}>
              <p> Already have an account ? </p>
              <span
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign in
              </span>
            </div>
          </div>
          <div className={style.containerRight}>
            <div className={style.rightImage}>
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
