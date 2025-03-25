// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      if (!email) return toast.warning("Please enter a email")
      if (!password) return toast.warning("Please enter a password")

      const response = await axios.post('/login', { email, password });

      if (response && response.data && response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.token)
        setEmail("")
        setPassword("")
        navigate("/dashboard")
      }


    } catch (error) {
      toast.warning(error.response.data.message)
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login as Admin</button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/adminRegister" style={{ marginTop: "1rem" }}>Click here to register as Admin</Link>
          <Link to="/customerRegister" style={{ marginTop: "1rem" }}>Click here to register as Customer</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;