import React from 'react'
import { Form } from 'react-router-dom';

const AddWeightForm = () => {
    // const input = document.getElementById("newWeightAmount");
    // const inputValue = input.value;
    // console.log(inputValue);

    return (
    <div className="addWeightForm">
        <h2>Add New Weight Entry</h2>
        <Form method="post">
            <input type="number" step="0.01" name="newWeightAmount" id="newWeightAmount" placeholder='ex. 175 lbs' required inputMode='decimal'/>
            <button type="submit">
                <span>Add New Weight Entry</span>
            </button>
        </Form>
    </div>
    )
}

export default AddWeightForm