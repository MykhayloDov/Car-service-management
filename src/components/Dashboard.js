import React, {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router";
import {auth, db, logOut} from "../firebase";
import "./Dashboard.css";
import Table from "./table_components/Table";

export default function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const query = await db
                .collection("users")
                .where("uid", "==", user?.uid)
                .get();
            const data = await query.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.log(err);
            // alert("An error occurred while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <div>
            <div className="dashboard_container">
                Logged in as: {user?.email}
                <button className="dashboard_btn" onClick={logOut}>
                    Logout
                </button>
            </div>
            <Table/>
        </div>
    );
};