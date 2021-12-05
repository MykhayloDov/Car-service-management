import React from "react";

export const ReadOnlyRows = ({item, handleEditClick, handleDeleteClick}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.brand}</td>
            <td>{item.category}</td>
            <td>{item.cost}</td>
            <td>{item.date}</td>
            <td>{item.notes}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, item)}>
                    Edit</button>
                <button type="button" onClick={(event) => handleDeleteClick(item.id)}>
                    Delete</button>
            </td>
        </tr>
    )
}