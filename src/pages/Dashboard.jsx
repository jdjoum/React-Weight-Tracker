import React, { useState } from 'react'

// Components
import Intro from "../components/Intro";
import AddWeightForm from "../components/AddWeightForm";

// Library Imports
import { toast } from "react-toastify";

// RRD Imports
import { useLoaderData } from "react-router-dom";

// Helper Functions
import { addNewWeightEntry, deleteItem, fetchData, wait } from '../helper';

// dashboardLoader - Loads the info needed from localStorage for the components within the dashboard
export function dashboardLoader() {
    const userName = fetchData("userName");
    const weights = fetchData("weights");
    const goalWeight = fetchData("goalWeight");
    const weightUnit = fetchData("weightUnit");
    const height = fetchData("height");
    const heightUnit = fetchData("heightUnit");
    const age = fetchData("age");
    return { userName, weights, weightUnit, goalWeight, heightUnit, height, age }
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
            localStorage.setItem("weightUnit", JSON.stringify(values.weightUnit));
            const goalWeight = (+values.goalWeight).toFixed(2);
            localStorage.setItem("goalWeight", goalWeight);
            const height = (+values.height).toFixed(2); 
            localStorage.setItem("height", height);
            localStorage.setItem("heightUnit", JSON.stringify(values.heightUnit));
            localStorage.setItem("age", JSON.stringify(values.age));
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
                date: values.dateInput,
                height: values.height,
                weightUnit: values.weightUnit,
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
            localStorage.setItem("goalWeight", formattedGoalWeight);
            return toast.success("Goal weight updated!");
        } catch(e) {
            console.error(e)
            throw new Error("There was a problem updating your goal weight.");
        }
    }

    // updateName Form Submission on the Profile page
    if (_action === "updateName") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName));
            return toast.success("Name updated!");
        } catch(e) {
            console.error(e)
            throw new Error("There was a problem updating your name.");
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
    const { userName, weights, weightUnit, goalWeight, height, heightUnit, age } = useLoaderData()
    return (
        <>
            { userName ? (
                <div className='dashboard'>
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        <div className="grid-lg">
                            <div className="flex-lg">
                                <AddWeightForm 
                                    weights={weights} 
                                    weightUnit={weightUnit} 
                                    goalWeight={goalWeight}
                                    height={height}
                                    heightUnit={heightUnit}
                                    age={age}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Intro />}
        </>
    )
}

export default Dashboard