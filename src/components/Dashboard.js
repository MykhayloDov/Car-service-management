import React, {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router";
import {auth, db} from "../firebase";
import "./Dashboard.css";
import Table, {userData} from "./table_components/Table";
import {addDoc, collection, doc, setDoc} from "firebase/firestore";



export default function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();






    return (
        <div>
            <Table/>
        </div>
    );
};


const writeData = async () => {
    try {
        const docRef = await addDoc(collection(db, "Car_service_database"), {
            Brand: userData.brand,
            Category: userData.category,
            Cost: userData.cost,
            Notes: userData.notes,
        });
        console.log("Document added with ID:", docRef.id);
    } catch (e) {
        console.log("error adding doc:", e);
    }
}

export {Dashboard, writeData}