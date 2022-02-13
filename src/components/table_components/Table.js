import React, {Fragment, useState} from "react";
import {nanoid} from "nanoid";
import {ReadOnlyRows} from "./ReadOnlyRows";
import {EditableRows} from "./EditableRows";
import {writeData} from "../Dashboard";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebase";
import {doc, getDocs, deleteDoc, collection} from "firebase/firestore";
import "./Table.css"


const userData = {
    userEmail: null,
    brand: "",
    category: "",
    date: null,
    cost: null,
    notes: ""
};

export default function Table() {
    const [user] = useAuthState(auth);
    //console.log(user.email)
     function getEmail() {
        const userEmail = user.email;
        console.log(user.email);
        return userEmail;
    }

    const [items, setItems] = useState([]);
    const [addFormData, setAddFormData] = useState(
        {
            brand: "",
            category: "",
            date: "",
            cost: null,
            notes: "",
        }
    )


    const [editItemId, setEditItemId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        brand: "",
        category: "",
        date: "",
        cost: null,
        notes: "",
    })


    const handleAddFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }



    const handleAddFormSubmit = async (event) => {
        event.preventDefault();
        getEmail();
        userData.userEmail = user.email;
        userData.brand = addFormData.brand;
        userData.category = addFormData.category;
        userData.date = addFormData.date;
        userData.cost = addFormData.cost;
        userData.notes = addFormData.notes;
        await writeData();
        const newItem = {
            id: nanoid(5),
            brand: addFormData.brand,
            category: addFormData.category,
            date: addFormData.date,
            cost: addFormData.cost,
            notes: addFormData.notes,
        };
        const newItems = [...items, newItem];
        setItems(newItems);
    }



    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedItems = {
            id: editItemId,
            brand: editFormData.brand,
            category: editFormData.category,
            date: editFormData.date,
            cost: editFormData.cost,
            notes: editFormData.notes,
        }
        const newItems = [...items];
        const index = items.findIndex((item) => item.id === editItemId);
        newItems[index] = editedItems;

        setItems(newItems);
        setEditItemId(null);
    }

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditItemId(item.id);
        const formValues = {

            brand: item.brand,
            category: item.category,
            date: item.date,
            cost: item.cost,
            notes: item.notes,
        }
        setEditFormData(formValues);
    }

    const handleCancelClick = () => {
        setEditItemId(null)
    }

    const handleDeleteClick = async (itemId) => {
        const newItems = [...items];
        const index = items.findIndex((item) => item.id === itemId);
        newItems.splice(index, 1);
        setItems(newItems);

        const deleteDoc = async (itemId) => {
            const noteRef = doc(db, "Car_service_database/nadiadovhan290@gmail.com/Parts", itemId.id);
            await deleteDoc(noteRef);
        }
        await deleteDoc();
    }


    return (
        <div className="table">
            <form onSubmit={handleEditFormSubmit}>
                <table id="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Cost</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                        <Fragment key={item.id}>
                            {
                                editItemId === item.id ?
                                    (<EditableRows
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />) :
                                    (<ReadOnlyRows
                                        item={item}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />)
                            }
                        </Fragment>
                    ))}
                    </tbody>
                </table>
            </form>
            <h2>Add item</h2>
            <form onSubmit={handleAddFormSubmit}>
                <input type="text" name="brand" required="required" placeholder="type the brand"
                       onChange={handleAddFormChange}/>
                <input type="text" name="category" required="required" placeholder="type the category"
                       onChange={handleAddFormChange}/>
                <input type="date" name="date" required="required" placeholder="select the date"
                       onChange={handleAddFormChange}/>
                <input type="number" name="cost" required="required" placeholder="enter the price"
                       onChange={handleAddFormChange}/>
                <input type="text" name="notes" placeholder="leave some notes"
                       onChange={handleAddFormChange}/>
                <button className="addBtn" type="submit">Add</button>
            </form>
        </div>
    )
}

export {userData};