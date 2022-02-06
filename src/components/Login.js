import React, { useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import "./login.css"



export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const [user, loading, error] = useAuthState(auth);
     const navigate = useNavigate();

    useEffect(() => {
        if (loading) {
            return;
        }
        if (user) {
            return navigate("/dashboard")


        }
    }, [user, loading]);


    return (
        <div className="login">
            <div className="login_container">
                <input
                    type="text"
                    className="login_textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login_textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login_btn"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button
                    className="login_btn login_google"
                    onClick={signInWithGoogle}
                >
                    Login with Google
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Don't have an account? <Link to="/register">&nbsp;Register</Link>&nbsp;&nbsp;Now
                </div>
            </div>
        </div>
    )
}
