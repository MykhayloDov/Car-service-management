import React from "react";

export default function Date(props) {
    const style ={
        paddingTop: 5,
        margin: 5
    }
    return (
        <div>
            <div style={style}>{props.label}</div>
            <input
            type="date"
            name={props.name}
            style={style}
            value={props.labelInputText}
            onChange={props.changeHandler}
            />
        </div>
    )
}