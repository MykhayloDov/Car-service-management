import React from "react";
import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, logOut} from "./firebase";



export default function App() {
     const [user, loading] = useAuthState(auth);


    return (
        <div className="root_container">
            <Router>
                <div className="navBar">
                    <ul>
                        <li><NavLink to="/home">Home</NavLink></li>
                        {!user && <li><NavLink to='/login'>Login</NavLink></li>}
                        {!user && <li><NavLink to="/register">Register</NavLink></li>}
                        {user && <li><NavLink to="dashboard">Dashboard</NavLink></li>}
                    </ul>
                    <Routes>
                        <Route exact path="/home" element={<Home/>}></Route>
                        <Route path="/login" element={<Login/>}></Route>
                        <Route path="/register" element={<Register/>}></Route>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                    </Routes>
                </div>
            </Router>
            <div className="logout_container">
                Logged in as: {user?.email}
                <button className="logout_btn" onClick={logOut}>
                    Logout
                </button>
            </div>
        </div>

    );
}


