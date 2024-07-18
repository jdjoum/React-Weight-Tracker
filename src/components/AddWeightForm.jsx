import React, { useState } from 'react'

// RRD Imports
import { Form, useLoaderData } from 'react-router-dom';

// Components
import Table from './Table';

// Helper Functions
import { fetchData } from '../helper';

var weightInputNum = 1;

// Loader
export function addWeightFormLoader(){
    const weights = fetchData("weights") ?? [];
    return {weights};
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
        const newWeight = {
            id: crypto.randomUUID(),
            entryNum: weightInputNum,
            createdAt: Date.now(),
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
        <Form method="post" onSubmit={handleSubmit}>
            <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder='ex. 175 lbs' required inputMode='decimal' onChange={handleInputChange}/>
            <button type="submit">
                <span>Add New Weight Entry</span>
            </button>
        </Form>
        {
            weights && weights.length > 0 && (
                <Table weights={weights}/>
            )
        }
        
    </div>
    )
}

export default AddWeightForm