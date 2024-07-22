import React from 'react'

// RRD Imports
import { Form } from 'react-router-dom';

// Library Imports
import { UserPlusIcon } from "@heroicons/react/24/solid"

// Assets
import illustration from "../assets/weight-tracker.jpg"

const Intro = () => {
  return (
    <div className='intro'>
        <div>
            <h1>Take control of <span className='accent'>Your Weight</span></h1>
            <p>Tracking your weight is the secret to a healthier you. Start your journey today with WeightWise.</p>
            <Form method="post">
                <label htmlFor="userName">Name</label>
                <input type='text' name='userName' required placeholder='What is your name?' aria-label='Your Name' autoComplete='given-name'/>
                <label htmlFor="weightUnits">Weight Units</label>
                <select name="weightUnits" id="weightUnits" required>
                  <option value="lbs">lbs</option>
                  <option value="kgs">kgs</option>
                </select>
                <input type="hidden" name='_action' value="newUser" />
                <button type="submit" className="btn btn--dark">
                    <span>Create Account</span>
                    <UserPlusIcon width={20} />
                </button>
            </Form>
        </div>
        <img src={illustration} alt='Person with money' width={600} />
    </div>
  )
}

export default Intro