import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import AdminRegister from "./pages/AdminRegister"
import AdminDashboard from "./pages/AdminDashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Welcome from "./pages/Welcome"
import { CommunityTC } from "./pages/CommunityTC"
import FAQs from "./pages/FAQs"
import Users from "./pages/Users"
import Comments from "./pages/Comments"
import Application from "./pages/Application"

import Navbar from "./components/navbar"

const App = () => {
    return (
        <div className="App">
        <Navbar></Navbar>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route path="/admin/register" element={<AdminRegister />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/CommunityTC" element={<CommunityTC />} />
                    <Route path="/Comments" element={<Comments />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Application" element={<Application />} />
                    <Route path="/FAQs" element={<FAQs />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;