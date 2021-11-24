import React from "react";

 export default function Notes(props) {
    const style ={
        paddingTop: 5,
        margin: 5
    }
    return (
        <div>
            <div style={style}>{props.label}</div>
            <textarea
                rows="4"
                cols="50"
                maxLength="200"
                name={props.name}
                style={style}
                value={props.labelInputText}
                onChange={props.changeHandler}
            />
        </div>
    )
}