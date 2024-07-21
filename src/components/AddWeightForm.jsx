import React, { useState } from 'react'

// RRD Imports
import { Form, useLoaderData } from 'react-router-dom';

// Components
import Table from './Table';

// Library Imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';

// Helper Functions
import { fetchData } from '../helper';

// Loader
export function addWeightFormLoader(){
    const weights = fetchData("weights") ?? [];
    return {weights};
}

const AddWeightForm = () => {
    const { weights } = useLoaderData();
    return (
    <div className="form-wrapper">
        <h2 className="h3">Add New Weight Entry</h2>
        <div className='container'>
            <Form method="post" className="grid-sm" >
                <div className="grid-xs">
                    <label htmlFor="dateInput">Weight Amount </label>
                    <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder='ex. 175 lbs' required inputMode='decimal'/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="dateInput">Date </label>
                    <input type="date" id="dateInput" className="input-field" name='dateInput' required></input>
                </div>
                <input type="hidden" name="_action" value="addWeightEntry"/>
                <button type="submit" className='btn btn--dark'>
                    <span>Add New Weight Entry</span>
                    <PlusCircleIcon width={20} />
                </button>
            </Form>
        </div>
        {
            weights && weights.length > 0 && (
                <Table weights={weights}/>
                // TODO: Create chart with table values
            )
        }
        
    </div>
    )
}

export default AddWeightForm