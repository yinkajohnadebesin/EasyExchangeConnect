import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Universities } from "./pages/Universities"
import { Welcome } from "./pages/Welcome"
import { CommunityTC } from "./pages/CommunityTC"
import Users from "./pages/Users"
import Comments from "./pages/Comments"

import Navbar from "./components/navbar"

const App = () => {
    return (
        <div className="App">
        <Navbar></Navbar>
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Universities" element={<Universities />} />
                    <Route path="/CommunityTC" element={<CommunityTC />} />
                    <Route path="/Comments" element={<Comments />} />
                    <Route path="/Users" element={<Users />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;