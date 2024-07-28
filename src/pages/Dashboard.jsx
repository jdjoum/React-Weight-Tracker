import React, { useState } from 'react'

// Components
import Intro from "../components/Intro";
import AddWeightForm from "../components/AddWeightForm";

// Library Imports
import { toast } from "react-toastify";

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { addNewWeightEntry, deleteItem, fetchData, updateGoalWeight, wait } from '../helper';

// dashboardLoader - Loads the info needed from localStorage for the components within the dashboard
export function dashboardLoader() {
    const userName = fetchData("userName");
    const weights = fetchData("weights");
    const weightUnits = fetchData("weightUnits");
    const goalWeight = fetchData("goalWeight");
    return { userName, weights, weightUnits, goalWeight }
}

// Action
export async function dashboardAction({request}){
    await wait()
    const data = await request.formData();
    const {_action,  ...values} = Object.fromEntries(data);

    // newUser Form Submission in the Intro component
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            localStorage.setItem("weightUnits", JSON.stringify(values.weightUnits));
            localStorage.setItem("goalWeight", JSON.stringify(values.goalWeight));
            return toast.success(`Welcome, ${values.userName}`);
        } catch(e) {
            throw new Error("There was a problem creating your account.");
        }
    }

    // addWeightEntry Form Submission in the AddWeightForm component
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

    // updateGoalWeight Form Submission in the AddWeightForm component
    if (_action === "updateGoalWeight") {
        try {
            const goalWeight = parseFloat(values.newGoalWeight);
            const formattedGoalWeight = goalWeight.toFixed(2);
            updateGoalWeight(formattedGoalWeight);
            return toast.success("Goal weight updated!");
        } catch(e) {
            console.error(e)
            throw new Error("There was a problem updating your goal weight.");
        }
    }

    // deleteWeightEntry Form submission in the AddWeightForm component
    if (_action === "deleteWeightEntry") {
        try {
            deleteItem({
                key: "weights",
                id: values.weightID
            })
            return toast.success("Weight entry deleted!")
        } catch(e) {
            throw new Error("There was a problem deleting the weight entry.")
        }
    }

}

const Dashboard = () => {
    const { userName, weights, weightUnits, goalWeight } = useLoaderData()
    return (
        <>
            { userName ? (
                <div className='dashboard'>
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddWeightForm weights={weights} weightUnits={weightUnits} goalWeight={goalWeight}/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard