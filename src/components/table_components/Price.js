import React from "react";

function Price(props) {
    const style ={
        paddingTop: 5,
        margin: 5
    }
    return (
        <div>
            <div style={style}>{props.label}</div>
            <input
                type="number"
                min="10.00" step="any"
                name={props.name}
                style={style}
                value={props.labelInputText}
                onChange={props.changeHandler}
            />
        </div>
    )
}