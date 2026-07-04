import React, { useContext } from "react";
import "../styles/auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";

const UserLogin = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const { data } = await axios.post(
        "https://task-management-backend-o7m3.onrender.com/api/auth/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      setAuthUser(data.user);
      navigate("/dashboard");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="login-page">
      <div className="auth-container">
        <div className="auth-container-1">
          <div className="auth-container-1-top">
            <div></div>
            <div>
              <h2>TaskFlow</h2>
              <p>Organize, Prioritize, Achieve</p>
            </div>
          </div>
          <div className="auth-container-1-mid login-image">
            <img src="/image2.png" alt="Not Found" />
          </div>
          <div className="auth-container-1-bottom">
            <h2>Welcome Back!</h2>
            <p>
              Sign in to continue managing your tasks <br />
              and stay productive
            </p>
          </div>
        </div>
        <div className="auth-container-2 login-form-part ">
          <div className="login-form-part-top">
            <h2>Login to your account</h2>
            <p>Enter your credentials to access your account</p>
          </div>
          <div className="auth-container-2-mid">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label-class">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="label-class">password</label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  name="password"
                  required
                  minLength={6}
                />
              </div>
              <div className="submit-btn">
                <button type="submit">Sign Up</button>
              </div>
              <div className="login-a">
                <p>
                  Don't have an account?{" "}
                  <span>
                    <NavLink
                      to={"/user/register"}
                      style={{ textDecoration: "none", color: "#6150EC" }}
                    >
                      Sign up
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

export default UserLogin;
