import React, {useState} from "react";
import {nanoid} from "nanoid";
import {ReadOnlyRows} from "./ReadOnlyRows";
import "./Table.css"


export default function Table(props) {
const [items, setItems] = useState([])
    const [addFormData, setAddFormData] = useState(
        {
            brand: "",
            category: "",
            cost: null,
            date: "",
            notes: "",
        }
    )

    const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newItem = {
        id:nanoid(),
        brand:addFormData.brand,
        category:addFormData.category,
        date:addFormData.date,
        cost:addFormData.cost,
        notes:addFormData.notes,
    }
    const newItems = [...items, newItem];
    setItems(newItems);
    }

    return (
        <div className="table">
            <table id="table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Cost</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.brand}</td>
                        <td>{item.category}</td>
                        <td>{item.cost}</td>
                        <td>{item.date}</td>
                        <td>{item.notes}</td>
                    </tr>))}
                </tbody>
            </table>
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
                <textarea name="notes" placeholder="here you may leave some notes"
                 onChange={handleAddFormChange}/>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}