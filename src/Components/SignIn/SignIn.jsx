import React, { useState } from "react";
import style from "./SignIn.module.css";
import logo from "../../assets/Images/logo.png";
import { FaCircle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const SignIn = () => {
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    apiError: "",
  });
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
      valid = false;
    }

    if (!password) {
      passwordError = "Password is required";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError, apiError: "" });
    return valid;
  };

  async function login() {
    if (validateInputs()) {
      setLoading(true);
      await fetch(`${url}/userlogin/api/userlogin`, {
        method: "POST",
        body: JSON.stringify({
          user_email: email,
          user_password: password,
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
            setErrors({ email: "", password: "", apiError: data.msg });
          }
        });
    }
  }

  return (
    <div className={style.container}>
      {loading && <Loader />}
      <div className={style.loginFirstContainer}>
        <div className={style.loginSecondContainer}>
          <div className={style.containerLeft}>
            <div className={style.leftImage}>
              <img src={logo} alt="" />
            </div>
          </div>
          <div className={style.containerRight}>
            <div className={style.mLogoContainer}>
              <div className={style.mImage}>
                <img src={logo} alt="" />
              </div>
            </div>
            <div className={style.rightHeader}>
              <p>Welcome back to syoft</p>
              <FaCircle />
            </div>
            <div className={style.rightSecondHeader}>
              <p>Sign In</p>
              {errors.apiError ? (
                <span style={{ color: "#fe1818" }}>{errors.apiError}</span>
              ) : (
                <span>Enter your email and password to sign in!</span>
              )}
            </div>
            <div className={style.rightInputContainer}>
              <div className={style.inputValue}>
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
                  placeholder="Enter Email"
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
              <div className={style.inputValue}>
                {errors.password ? (
                  <p>{errors.password}</p>
                ) : (
                  <label htmlFor="pwd">Password*</label>
                )}
                <div
                  className={style.passwordInput}
                  style={{
                    borderColor: errors.password ? " #fe1818" : " #d3d3d3",
                  }}
                >
                  <input
                    autoComplete="off"
                    type={passwordView ? "text" : "password"}
                    name="pwd"
                    id="pwd"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors({ ...errors, password: "", apiError: "" });
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
              <div className={style.forgotContainer}>
                <p>Forgot password?</p>
              </div>
            </div>
            <div className={style.rightLoginButton}>
              <button
                onClick={() => {
                  login();
                }}
              >
                Sign in
              </button>
            </div>
            <div className={style.registerContainer}>
              <p>Not registered yet ? </p>
              <span
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
