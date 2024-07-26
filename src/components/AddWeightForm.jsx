import React, { useEffect, useRef, useState } from 'react'

// RRD Imports
import { useFetcher } from 'react-router-dom';

// Components
import WeightEntry from './WeightEntry'

// Library Imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

// Helper functions
import { convertGoalWeight, convertWeightUnits, fetchData } from '../helper';
import WeightLineChart from './WeightLineChart';

const AddWeightForm = ({ weights, weightUnits, goalWeight }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const isSubmitting2 = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();
    const [weightVals, setWeightVals] = useState(weights);
    const [unit, setUnit] = useState(weightUnits);
    const [targetWeight, setTargetWeight] = useState(goalWeight);
    const [count, setCount] = useState(0);


    useEffect(() => {
        if(!isSubmitting) {
            // Reset the form and focus on the first input once submitted
            formRef.current.reset()
            focusRef.current.focus()
            const existingWeights = fetchData("weights") ?? [];
            setWeightVals(existingWeights);
        }
    }, [isSubmitting])

    useEffect(() => {
        localStorage.setItem("weightUnits", JSON.stringify(unit));
    }, [unit])

    const handleToggle = () => {
        setCount(count + 1);
        const existingWeights = fetchData("weights") ?? [];
        var newWeights = convertWeightUnits(existingWeights, unit);
        setWeightVals(newWeights);
        localStorage.setItem("weightUnits", JSON.stringify(unit));
        setUnit(prevUnits => (prevUnits === 'kgs' ? 'lbs' : 'kgs'));
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
            //TODO: Create chart with table values
            weightVals && weightVals.length > 0 && (
                <div className="grid-md">
                    <div className='table'>
                        {/* WeightUnitsToggle Form */}
                        <div className='form-wrapper'>
                            <h2 className="h3">Change Weight Units</h2>
                            <button type="submit" className='btn btn--dark' disabled={isSubmitting2} onClick={handleToggle}>
                                {
                                    isSubmitting2 ? <span>Submitting...</span> : (
                                        <>
                                            <span>{unit === 'lbs' ? 'Change units to kgs' : 'Change units to lbs'}</span>
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
                                    ["Entry Number", "Weight (" + unit + ")", "Date", "Created At"].map((i, index) => (
                                        <th key={index}>{i}</th>
                                    ))
                                }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    weightVals?.map((weight) => (
                                            <tr key={weight.id}>
                                                <WeightEntry weight={weight} weightUnits={unit} />
                                            </tr>    
                                    ))
                                }
                            </tbody>
                        </table>
                        <WeightLineChart weightEntries={weightVals} weightUnits={unit} goalWeight={targetWeight}/>
                    </div>
                </div>
            )
        }
    </>
    )
}

export default AddWeightForm