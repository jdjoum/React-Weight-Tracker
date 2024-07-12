import React, { useState } from 'react'
import { Form } from 'react-router-dom';

var weightInputNum = 1;

// Loader
export function addWeightFormLoader(){
    // Go thru all keys starting from 1
    while(localStorage.key(weightInputNum) != null) {
        console.log("Key ",weightInputNum ," already exists in localStorage")
        weightInputNum++;
    }
    if (localStorage.key(weightInputNum) == null && weightInputNum != 1) {
        // When on the last key, add 1 to start adding the next key
        // Otherwise,  don't increment the key
        console.log("Key ",weightInputNum ," already exists in localStorage")
        weightInputNum++;
    } 
    return weightInputNum;
}

const AddWeightForm = () => {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const inputWeight = { inputValue };
        localStorage.setItem(weightInputNum, JSON.stringify(inputWeight));
        console.log(inputWeight);
        weightInputNum++;
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