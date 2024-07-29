import React, { useEffect, useRef, useState } from 'react'

// RRD Imports
import { useFetcher, Form } from 'react-router-dom';

// Library Imports
import { PlusCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

// Helper functions
import { convertGoalWeight, convertweightUnit, fetchData } from '../helper';
import WeightLineChart from './WeightLineChart';

const AddWeightForm = ({ weights, weightUnit, goalWeight, height, heightUnit }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    // Ref variables
    const formRef = useRef();
    const focusRef = useRef();
    // State variables
    const [weightVals, setWeightVals] = useState(weights);
    const [unit, setUnit] = useState(weightUnit);
    const [targetWeight, setTargetWeight] = useState(goalWeight);
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
        localStorage.setItem("weightUnit", JSON.stringify(unit));
    }, [unit])

    // handleToggle - Handles the logic when the change weight unit toggle button is clicked
    const handleToggle = () => {
        setCount(count + 1);
        const existingWeights = fetchData("weights") ?? [];
        var newWeights = convertweightUnit(existingWeights, unit);
        setWeightVals(newWeights);
        localStorage.setItem("weightUnit", JSON.stringify(unit));
        setUnit(prevUnits => (prevUnits === 'kg' ? 'lbs' : 'kg'));
        var newGoalWeight = convertGoalWeight(targetWeight, unit);
        setTargetWeight(newGoalWeight);
    };

    return (
    <>
        <div className="form-wrapper">
            <h2 className="h3">Add New Weight Entry in {unit}</h2>
            <div className='container'>
                <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                    <div className="grid-xs">
                        <label htmlFor="newWeightAmount">Weight Amount </label>
                        <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder={`Enter your weight (${unit})`} required inputMode='decimal'ref={focusRef}/>
                        <input type="hidden" name="height" value={height}/>
                        <input type="hidden" name="weightUnit" value={unit}/>
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
                            <h2 className="h3">Update Goal Weight in {unit}</h2>
                            <fetcher.Form method="post">
                                <div className="grid-xs">
                                    <label htmlFor="newGoalWeight">Weight Amount </label>
                                    <input type="number" step="0.01" name="newGoalWeight" id="newGoalWeight" placeholder={`Enter your goal weight (${unit})`} required inputMode='decimal' />
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
                            <h2 className="h3">Change Weight Unit</h2>
                            <button type="submit" className='btn btn--dark' disabled={isSubmitting} onClick={handleToggle}>
                                {
                                    isSubmitting ? <span>Submitting...</span> : (
                                        <>
                                            <span>{unit === 'lbs' ? 'Change unit to kg' : 'Change unit to lbs'}</span>
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
                                    ["Weight (" + unit + ")", "Date", "Created At", ""].map((i, index) => (
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
                                                    <td>{weight.weight + " " + unit}</td>
                                                    <td>{weight.date}</td>
                                                    <td>{weight.createdAt}</td>
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
                        <WeightLineChart weightEntries={weightVals} weightUnit={unit} goalWeight={targetWeight}/>
                    </div>
                </div>
            )
        }
    </>
    )
}

export default AddWeightForm