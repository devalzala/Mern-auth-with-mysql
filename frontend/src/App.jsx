// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRegister from './pages/CustomerRegister';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import "./App.css"
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/customerRegister" element={<CustomerRegister />} />
          <Route path="/adminRegister" element={<AdminRegister />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          ></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;