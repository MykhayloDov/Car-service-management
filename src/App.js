import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlete
} from "react-router-dom";
import {NavLink} from "react-router-dom";
import { fakeAuthProvider } from "./auth"
import './App.css';
import Home from "./components/Home"
import Login from "./components/Login";
import Register from "./components/Register"
import Dashboard from "./components/Dashboard";



function App() {
    return (
        <div className="root_container">
            <Router>
                <div className="navBar">
                    <ul>
                        <li><NavLink exact to="/home">Home</NavLink></li>
                        <li><NavLink exact to="/login">Login</NavLink></li>
                        <li><NavLink exact to="/register">Register</NavLink></li>
                        <li className="dashboardLink"><NavLink exact to="dashboard">Dashboard</NavLink></li>
                    </ul>
                    <Routes>
                        <Route exact path="/home" element={<Home/>}></Route>
                        <Route exact path="/login" element={<Login/>}></Route>
                        <Route exact path="/register" element={<Register/>}></Route>
                        <Route exact path="/dashboard" element={<Dashboard/>}></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
