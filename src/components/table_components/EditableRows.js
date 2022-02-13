import React from "react";
import {nanoid} from "nanoid";

export const EditableRows = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return (
            <tr>
                <td>
                </td>
                <td>
                    <input type="text"
                           required="required"
                           placeholder="enter a brand"
                           name="brand"
                           value={editFormData.brand}
                           onChange={handleEditFormChange}/>
                </td>
                <td>
                    <input type="text"
                           required="required"
                           placeholder="enter the category"
                           name="category"
                           value={editFormData.category}
                           onChange={handleEditFormChange}/>
                </td>
                <td>
                    <input type="date"
                           required="required"
                           placeholder="select the date"
                           name="date"
                           value={editFormData.date}
                           onChange={handleEditFormChange}/>
                </td>
                <td>
                    <input type="number"
                           required="required"
                           placeholder="type the price"
                           name="cost"
                           value={editFormData.cost}
                           onChange={handleEditFormChange}/>
                </td>
                <td>
                    <input type="text"
                           placeholder="here you may leave some notes"
                           name="notes"
                           value={editFormData.notes}
                           onChange={handleEditFormChange}/>
                </td>
                <td>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>
                </td>
            </tr>

    )
}