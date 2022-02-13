import React from "react";
import {db} from "../firebase";
import "./Dashboard.css";
import Table, {userData} from "./table_components/Table";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";


export default function Dashboard() {


    return (
        <div>
            <Table/>
        </div>
    );
};


const writeData = async () => {
    let path = "Car_service_database/" + userData.userEmail + "/";
    try {
        const docRef = await addDoc(collection(db, path, "Parts/"), {
            Brand: userData.brand,
            Category: userData.category,
            Cost: userData.cost,
            Notes: userData.notes,
        });
        console.log("Document added with ID:", docRef.id, userData.userEmail, path);
        const getNotes = async () => {
            const notesSnapshots = await getDoc(doc(db, "Car_service_database/nadiadovhan290@gmail.com/Parts", docRef.id));
            if (notesSnapshots.exists()) {
                return console.log(notesSnapshots.data());
            } else {
                console.log("No")
            }
        }
        await getNotes(docRef.id);
    } catch (e) {
        console.log("error adding doc:", e);
    }
}

export {Dashboard, writeData}