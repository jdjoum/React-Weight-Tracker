import React from 'react'

// Components
import Intro from "../components/Intro";
import AddWeightForm from "../components/AddWeightForm";

// Library Imports
import { toast } from "react-toastify";

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { addNewWeightEntry, fetchData } from '../helper';

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
    const {_action,  ...values} = Object.fromEntries(data);

    // newUser Form Submission in Intro component
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success(`Welcome, ${values.userName}`);
        } catch(e) {
            throw new Error("There was a problem creating your account.");
        }
    }

    // addWeightEntry Form Submission in AddWeightForm component
    if (_action === "addWeightEntry") {
        try {
            addNewWeightEntry({
                amount: values.newWeightAmount, 
                date: values.dateInput
            });
            return toast.success("Weight entry added!");
        } catch(e) {
            console.error(e)
            throw new Error("There was a problem adding the new weight entry.");
        }
    }

}

const Dashboard = () => {
    const { userName, weights } = useLoaderData()
    return (
        <>
            { userName ? (
                <div className='dashboard'>
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {
                        // TODO: Create component called SelectWeightUnits 
                        /* {weights ? () : ()} */}
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddWeightForm />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard