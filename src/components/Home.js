import React from "react";
import home from './assets/home.jpg'

export default function Home() {

    return (
        <div style={{ backgroundImage:`url(${home})` }}>
        <h2>Hello!!</h2>
            <h1>
            WELCOME To your CarService!
        </h1>
        </div>
    )
}
