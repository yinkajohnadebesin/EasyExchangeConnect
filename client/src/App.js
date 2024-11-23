import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Universities } from "./pages/Universities"
import { Welcome } from "./pages/Welcome"

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/Universities" element={<Universities />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;