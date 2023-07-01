import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //on submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if(res && res.data.success){
        toast.success(res.data.message);
        navigate('/login');
      }
      else{
        toast.error(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title="Register Ecommerce App">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h1 className="title">Register Page</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your Name"
              required
            />
          </div>
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
              aria-required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              className="form-control"
              id="secretQuestion"
              placeholder="What is your Date of Birth "
              aria-required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
