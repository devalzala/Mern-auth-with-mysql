// src/pages/AdminRegister.jsx
import React, { useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName) return toast.warning("Please enter first name")
    if (!formData.lastName) return toast.warning("Please enter last name")
    if (!formData.email) return toast.warning("Please enter email")
    if (!formData.password) return toast.warning("Please enter password")

    let finalData = {
      firstName: formData && formData.firstName && formData.firstName.trim(),
      lastName: formData && formData.lastName && formData.lastName.trim(),
      email: formData && formData.email && formData.email.trim(),
      password: formData && formData.password && formData.password.trim(),
      role: "admin"
    }

    try {
      const response = await axios.post('/register', finalData);
      toast.success(response.data.message)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      })
      navigate("/")
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register as Admin</button>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/" style={{ marginTop: "1rem" }}>Click to visit login</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;