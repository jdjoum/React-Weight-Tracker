import React, { useState } from 'react'
import { Form } from 'react-router-dom';

const AddWeightForm = () => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputWeight = { inputValue };
        console.log(inputWeight);
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
        <p>{inputValue}</p>
    </div>
    )
}

export default AddWeightForm