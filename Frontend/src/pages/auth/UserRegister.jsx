import React, { useContext } from "react";
import "../styles/auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
const UserRegister = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userName = e.target.userName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const bio = e.target.bio.value;

    try {
      const { data } = await axios.post(
        "https://task-management-backend-o7m3.onrender.com/api/auth/user/register",
        {
          userName,
          email,
          password,
          bio,
        },
        {
          withCredentials: true,
        },
      );
      setAuthUser(data.user);
      toast.success(data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
    }
  };
  return (
    <div className="register-page">
      <div className="auth-container">
        <div className="auth-container-1">
          <div className="auth-container-1-top">
            <h2>TaskFlow</h2>
            <p>Organize, Prioritize, Achieve</p>
          </div>
          <div className="auth-container-1-mid">
            <img src="/image1.jpg" alt="Not Found" />
          </div>
          <div className="auth-container-1-bottom">
            <h2>
              Get Started With <br />
              Task Management
            </h2>
            <p>
              Create your account and start organizing <br />
              your task in a smarter way.
            </p>
          </div>
        </div>
        <div className="auth-container-2">
          <div className="auth-container-2-top">
            <h2>Create an account</h2>
            <p>Sign up to get started with TaskFlow</p>
          </div>
          <div className="auth-container-2-mid">
            <form onSubmit={handleSubmit}>
              <div className="form-group form-group-2">
                <label className="label-class">Full Name</label>
                <input
                  className="register-inp"
                  type="text"
                  placeholder="John Doe"
                  name="userName"
                  required
                />
              </div>
              <div className="form-group form-group-2">
                <label className="label-class">Email Address</label>
                <input
                  className="register-inp"
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  required
                />
              </div>
              <div className="form-group form-group-2">
                <label className="label-class">password</label>
                <input
                  className="register-inp"
                  type="password"
                  placeholder="Create a strong password"
                  name="password"
                  required
                  minLength={6}
                />
              </div>
              <div className="form-group form-group-2">
                <label className="label-class">Bio</label>
                <textarea
                  className="register-inp"
                  name="bio"
                  placeholder="Enter your bio here"
                  maxLength={50}
                ></textarea>
              </div>
              <div className="check-box form-group-2">
                <input type="checkbox" />
                <label className="label-class">
                  I Agree To The<span> Terms of Services</span> and
                  <span> Privacy Policy</span>
                </label>
              </div>
              <div className="submit-btn form-group-2">
                <button type="submit">Sign Up</button>
              </div>
              <div className="login-a">
                <p>
                  Already have an account?{" "}
                  <span>
                    <NavLink
                      to={"/user/login"}
                      style={{ textDecoration: "none", color: "#6150EC" }}
                    >
                      Login
                    </NavLink>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
