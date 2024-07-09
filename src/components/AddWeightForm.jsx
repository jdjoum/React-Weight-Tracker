import React from 'react'
import { Form } from 'react-router-dom';

const AddWeightForm = () => {
  return (
    <div className="addWeightForm">
        <h2>Add New Weight Entry</h2>
        <Form method="post">
            <button type="submit">
                <span>Add New Weight Entry</span>
            </button>
        </Form>
    </div>
  )
}

export default AddWeightForm