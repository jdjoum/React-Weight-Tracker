import React, { useState } from 'react'

// RRD Imports
import { Form, useLoaderData } from 'react-router-dom';

// Components
import Table from './Table';

// Library Imports
import { PlusCircleIcon } from '@heroicons/react/24/solid';

// Helper Functions
import { fetchData } from '../helper';

var weightInputNum = 1;

// Loader
export function addWeightFormLoader(){
    const weights = fetchData("weights") ?? [];
    return {weights};
}

function retrieveDate() {
    // Get the input element by its ID
    const dateInput = document.getElementById('dateInput');
    console.log(dateInput);
    // Get the value of the input field (in YYYY-MM-DD format)
    const dateValue = dateInput.value;
    console.log(dateValue);
    return dateValue;
}

const AddWeightForm = () => {
    const { weights } = useLoaderData();
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (fetchData("weights") != null) {
            weightInputNum = fetchData("weights").length + 1;
        }
        const date = retrieveDate();
        const newWeight = {
            id: crypto.randomUUID(),
            entryNum: weightInputNum,
            createdAt: date,
            weight: +inputValue,
        }
        const existingWeights = fetchData("weights") ?? [];
        localStorage.setItem("weights", JSON.stringify([...existingWeights,newWeight]));
        weightInputNum++;
        window.location.reload();
    }

    return (
    <div className="addWeightForm">
        <h2>Add New Weight Entry</h2>
        <div className='container'>
            <Form method="post" onSubmit={handleSubmit}>
                <label htmlFor="dateInput">Enter your weight: </label>
                <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder='ex. 175 lbs' required inputMode='decimal' onChange={handleInputChange}/>
                <br/>
                <br/>
                <label htmlFor="dateInput">Select a date: </label>
                <input type="date" id="dateInput" className="input-field" required></input>
                <br/>
                <br/>
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