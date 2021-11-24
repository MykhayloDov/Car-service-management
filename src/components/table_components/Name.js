import React from "react";

export default function Name(props) {
    const style ={
        paddingTop: 5,
        margin: 5
    }
    return (
        <div>
            <div style={style}>{props.label}</div>
            <input
                type="text"
                name={props.name}
                style={style}
                value={props.labelInputText}
                onChange={props.changeHandler}
            />
        </div>
    )
}