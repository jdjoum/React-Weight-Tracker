import React, { useEffect, useRef, useState } from 'react'

// RRD Imports
import { useFetcher, Form } from 'react-router-dom';

// Library Imports
import { PlusCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

// Helper functions
import { convertGoalWeight, convertHeight, convertweightUnit, fetchData } from '../helper';

// Components
import WeightLineChart from './WeightLineChart';

const AddWeightForm = ({ weights, weightUnit, goalWeight, height, heightUnit }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    // Ref variables
    const formRef = useRef();
    const focusRef = useRef();
    // State variables
    const [weightVals, setWeightVals] = useState(weights);
    const [weightUnitVal, setWeightUnitVal] = useState(weightUnit);
    const [targetWeight, setTargetWeight] = useState(goalWeight);
    const [heightVal, setHeightVal] = useState(height);
    const [heightUnitVal, setHeightUnitVal] = useState(heightUnit);
    const [count, setCount] = useState(0);


    useEffect(() => {
        if(!isSubmitting) {
            // Reset the form and focus on the first input once submitted
            formRef.current.reset()
            focusRef.current.focus()
            const existingWeights = fetchData("weights") ?? [];
            setWeightVals(existingWeights);
            const goalWeight = fetchData("goalWeight");
            setTargetWeight(goalWeight);
        }
    }, [isSubmitting])

    useEffect(() => {
        localStorage.setItem("weightUnit", JSON.stringify(weightUnitVal));
        localStorage.setItem("heightUnit", JSON.stringify(heightUnitVal));
    }, [weightUnitVal, heightUnitVal])

    // handleToggle - Handles the logic when the change weight unit toggle button is clicked
    const handleToggle = () => {
        setCount(count + 1);
        // Update the weightUnit in localStorage and the state variable
        setWeightUnitVal(prevUnits => (prevUnits === 'kg' ? 'lbs' : 'kg'));
        localStorage.setItem("weightUnit", JSON.stringify(weightUnitVal));
        // Convert the existingWeights based on the weightUnit change
        const existingWeights = fetchData("weights") ?? [];
        var newWeights = convertweightUnit(existingWeights, weightUnitVal);
        setWeightVals(newWeights);
        localStorage.setItem("weights", JSON.stringify(newWeights));
        // Convert the goalWeight based on the weightUnit change
        var newGoalWeight = convertGoalWeight(targetWeight, weightUnitVal);
        localStorage.setItem("goalWeight", JSON.stringify(newGoalWeight));
        setTargetWeight(newGoalWeight);
        // Update the heightUnit in localStorage
        setHeightUnitVal(prevUnits => (prevUnits === 'meters' ? 'inches' : 'meters'));
        localStorage.setItem("heightUnit", JSON.stringify(heightUnitVal));
        // Convert the height based on the heightUnit change
        var newHeight = convertHeight(heightVal, heightUnitVal);
        localStorage.setItem("height", JSON.stringify(newHeight));
        setHeightVal(newHeight);
        localStorage.setItem("height", JSON.stringify(newHeight));
    };

    return (
    <>
        <div className='form-wrapper'>
            <h2 className="h3">Health Details</h2>
            <p>Height: {heightVal} {heightUnitVal}</p>
            <p>Goal Weight: {targetWeight} {weightUnitVal}</p>
        </div>
        <div className="form-wrapper">
            <h2 className="h3">Add New Weight Entry in {weightUnitVal}</h2>
            <div className='container'>
                <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                    <div className="grid-xs">
                        <label htmlFor="newWeightAmount">Weight Amount </label>
                        <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder={`Enter your weight (${weightUnitVal})`} required inputMode='decimal'ref={focusRef}/>
                        <input type="hidden" name="height" value={height}/>
                        <input type="hidden" name="weightUnit" value={weightUnitVal}/>
                    </div>
                    <div className="grid-xs">
                        <label htmlFor="dateInput">Date </label>
                        <input type="date" id="dateInput" className="input-field" name='dateInput' required></input>
                    </div>
                    <input type="hidden" name="_action" value="addWeightEntry"/>
                    <button type="submit" className='btn btn--dark' disabled={isSubmitting} >
                        {
                            isSubmitting ? <span>Submitting...</span> : (
                                <>
                                    <span>Add New Weight Entry</span>
                                    <PlusCircleIcon width={20} />
                                </>
                            )
                        }
                    </button>
                </fetcher.Form>
            </div>
        </div>
        {   
            // Table Component
            weightVals && weightVals.length > 0 && (
                <div className="grid-md">
                    <div className='table'>
                        {/* weightUnitToggle Form */}
                        <div className='form-wrapper'>
                            <h2 className="h3">Update Goal Weight in {weightUnitVal}</h2>
                            <fetcher.Form method="post">
                                <div className="grid-xs">
                                    <label htmlFor="newGoalWeight">Weight Amount </label>
                                    <input type="number" step="0.01" name="newGoalWeight" id="newGoalWeight" placeholder={`Enter your goal weight (${weightUnitVal})`} required inputMode='decimal' />
                                    <input type="hidden" name="_action" value="updateGoalWeight"/>
                                    <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                                        {
                                            isSubmitting ? <span>Submitting...</span> : (
                                                <>
                                                    <span>Update Goal Weight</span>
                                                    <ArrowPathIcon width={20} />
                                                </>
                                            )
                                        }
                                    </button>
                                </div>
                            </fetcher.Form>
                        </div>
                        <br></br>
                        {/* weightUnitToggle Form */}
                        <div className='form-wrapper'>
                            <h2 className="h3">Change Weight & Height Units</h2>
                            <button type="submit" className='btn btn--dark' disabled={isSubmitting} onClick={handleToggle}>
                                {
                                    isSubmitting ? <span>Submitting...</span> : (
                                        <>
                                            <span>{weightUnitVal === 'lbs' ? 'Change units to kg and meters' : 'Change unit to lbs and inches'}</span>
                                            <ArrowPathIcon width={20} />
                                        </>
                                    )
                                }
                            </button>
                        </div>
                        <br></br>
                        {/* Weight History Table */}
                        <h2>Weight History</h2>
                        <table>
                            <thead>
                                <tr>
                                {
                                    ["Weight (" + weightUnitVal + ")", "Date", "Created At", "BMI", ""].map((i, index) => (
                                        <th key={index}>{i}</th>
                                    ))
                                }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    weightVals?.map((weight) => (
                                            <tr key={weight.id}>
                                                <>
                                                    <td>{weight.weight + " " + weightUnitVal}</td>
                                                    <td>{weight.date}</td>
                                                    <td>{weight.createdAt}</td>
                                                    <td>{weight.bmi}</td>
                                                    <td>
                                                        <fetcher.Form className="Form" method="post">
                                                            <input type="hidden" name="_action" value="deleteWeightEntry"/>
                                                            <input type="hidden" name="weightID" value={weight.id}/>
                                                            <button type="submit" className="btn btn--warning" aria-label={`Delete weight entry ${weight.id}`}>
                                                                <TrashIcon width={20}/>
                                                            </button>
                                                        </fetcher.Form>
                                                    </td>
                                                </>
                                            </tr>    
                                    ))
                                }
                            </tbody>
                        </table>
                        <WeightLineChart weightEntries={weightVals} weightUnit={weightUnitVal} goalWeight={targetWeight}/>
                    </div>
                </div>
            )
        }
    </>
    )
}

export default AddWeightForm