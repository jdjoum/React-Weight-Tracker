import React from 'react'

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { fetchData } from '../helper';

// Loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName }
}

const Dashboard = () => {
    const { userName } = useLoaderData()
    return (
        <div>
            <h1>{userName}</h1>
            Dashboard
        </div>
    )
}

export default Dashboard