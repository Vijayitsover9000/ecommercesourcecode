import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

  
    //on submit handler
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          { email, newPassword,answer }
        );
        if (res && res.data.success) {  
          toast.success(res.data.message);
          console.log(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
  return (
    <Layout title="Forgot Password E-commerce App">
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your New Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="form-control"
              id="secretQuestion"
              placeholder="Enter your Date of Birth"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
          
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword;