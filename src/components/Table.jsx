import React, { useEffect, useState } from 'react'

// Components
import WeightEntry from './WeightEntry'
import { useFetcher } from 'react-router-dom';

// Library Imports
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { convertWeightUnits, fetchData, kgsToLbs, lbsToKgs } from '../helper';

const Table = ({ weights,  weightUnits }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const [unit, setUnit] = useState(weightUnits);
    const [count, setCount] = useState(0);

    // useEffect hook to update localStorage whenever the `unit` changes
    useEffect(() => {
        if (count > 0) {
            try {
                localStorage.setItem("weightUnits", JSON.stringify(unit));
            } catch (e) {
                console.error("There was a problem changing the weight units.");
            }
        }
    }, [unit, count, weights]); 

    const handleToggle = () => {
        const existingWeights = fetchData("weights") ?? [];
        var newWeights = convertWeightUnits(existingWeights, unit);
        setCount(count + 1);
        setUnit(prevUnits => (prevUnits === 'kgs' ? 'lbs' : 'kgs'));
    };

    return (
    <div className='table'>
        {/* WeightUnitsToggle Form */}
        <div className='form-wrapper'>
            <h2 className="h3">Change Weight Units</h2>
            <button type="submit" className='btn btn--dark' disabled={isSubmitting} onClick={handleToggle}>
                {
                    isSubmitting ? <span>Submitting...</span> : (
                        <>
                            <span>{unit === 'lbs' ? 'Show Weight History in kgs' : 'Show Weight History in lbs'}</span>
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
                    weights?.map((weight) => (
                            <tr key={weight.id}>
                                <WeightEntry weight={weight} weightUnits={unit} />
                            </tr>    
                    ))
                }
            </tbody>
        </table>
        
    </div>
    )
}

export default Table