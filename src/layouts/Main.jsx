import React from 'react'

// RRD Imports
import { Outlet, useLoaderData } from "react-router-dom";

// Assets 
import wave from "../assets/wave.svg"

// Helper Functions
import { fetchData } from '../helper';

// Components
import Nav from '../components/Nav';

// Loader
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()
    return (
        <div className="layout">
            <Nav userName={userName}/>
            <main>
                <Outlet />
            </main>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main