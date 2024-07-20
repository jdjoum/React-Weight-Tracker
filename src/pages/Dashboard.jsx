import React from 'react'

// Components
import Intro from "../components/Intro";
import AddWeightForm from "../components/AddWeightForm";

// Library Imports
import { toast } from "react-toastify";

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { fetchData } from '../helper';

// Loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const weights = fetchData("weights");
    return { userName, weights }
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
    const { userName, weights } = useLoaderData()
    return (
        <div className='dashboard'>
            <h1>Welcome back, <span className="accent">{userName}</span></h1>
            <div className="grid-sm">
                {/* {weights ? () : ()} */}
                <div className="grid-lg">
                    <div className="flex-lg">
                        <AddWeightForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard