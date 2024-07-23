import React, { useEffect, useRef, useState } from 'react'

// RRD Imports
import { Form, useFetcher } from 'react-router-dom';

// Library Imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';

const AddWeightForm = ({weightUnits, weights}) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if(!isSubmitting) {
            // Reset the form and focus on the first input once submitted
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])

    return (
    <div className="form-wrapper">
        <h2 className="h3">Add New Weight Entry</h2>
        <div className='container'>
            <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                <div className="grid-xs">
                    <label htmlFor="newWeightAmount">Weight Amount </label>
                    <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder='ex. 175 lbs' required inputMode='decimal'ref={focusRef}/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="dateInput">Date </label>
                    <input type="date" id="dateInput" className="input-field" name='dateInput' required></input>
                </div>
                <input type="hidden" name="_action" value="addWeightEntry"/>
                <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
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
    )
}

export default AddWeightForm