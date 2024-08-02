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
            <div className="rights-reserved">
                <h6 className="h6">WeightWise © 2024 by Julian-Justin Djoum. All Rights Reserved.</h6>
            </div>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main