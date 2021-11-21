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

function App() {
    return (
        <div>
            <Router>
                <div className="navBar">
                    <ul>
                        <li><NavLink exact to="/home">Home</NavLink></li>
                        <li><NavLink exact to="/login">Login</NavLink></li>
                        <li><NavLink exact to="/register">Register</NavLink></li>
                    </ul>
                    <Routes>
                        <Route exact path="/home" element={<Home/>}></Route>
                        <Route exact path="/login" element={<Login/>}></Route>
                        <Route exact path="/register" element={<Register/>}></Route>
                    </Routes>
                </div>
            </Router>
            {/*<div className="welcomeTitle">*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*    <h1>Welcome to the free car management webpage!</h1>*/}
            {/*    <br/>*/}
            {/*    <p className="welcomeNotes">This add will help you to perform an easy and lite registry of the car*/}
            {/*        maintenance operations, as well spare parts replacement. </p>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
