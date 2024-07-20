import React from 'react'

// Components
import Intro from "../components/Intro";

// Library Imports
import { toast } from "react-toastify";

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { fetchData } from '../helper';

// Loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName }
}

// Action
export async function dashboardAction({request}){
    // await wait()
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName));
        return toast.success(`Welcome, ${formData.userName}`);
    } catch(e) {
        throw new Error("There was a problem creating your account.")
    }
    
}

const Dashboard = () => {
    const { userName } = useLoaderData()
    return (
        <div>
            { userName ? (<p>{userName}</p>): <Intro />}
        </div>
    )
}

export default Dashboard