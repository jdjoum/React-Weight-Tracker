import React, { useState, useEffect } from 'react'

// RRD Imports
import { Form } from 'react-router-dom';

// Library Imports
import { UserPlusIcon } from "@heroicons/react/24/solid"

// Assets
import illustration from "../assets/weight-tracker.jpg"

const Intro = () => {

  const [weightUnit, setWeightUnit] = useState('lbs');
  const [heightUnit, setHeightUnit] = useState('inches');

  useEffect(() => {
    if (weightUnit === 'lbs') {
      setHeightUnit('inches');
    } else if (weightUnit === 'kg') {
      setHeightUnit('meters');
    }
  }, [weightUnit]);

  const handleWeightUnitChange = (event) => {
    setWeightUnit(event.target.value);
  };

  return (
    <div className='intro'>
        <div>
            <h1>Take control of <span className='accent'>Your Weight</span></h1>
            <p>Tracking your weight is the secret to a healthier you. Start your journey today with WeightWise.</p>
            <Form method="post">
                <label htmlFor="userName">Name</label>
                <input type='text' name='userName' required placeholder='What is your name?' aria-label='Your Name' autoComplete='given-name'/>
                <label htmlFor="weightUnit">Weight Unit</label>
                <select name="weightUnit" id="weightUnit" onChange={handleWeightUnitChange} required>
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
                <label htmlFor="goalWeight">Goal Weight</label>
                <input type='number' name='goalWeight' min={1} required inputMode='decimal' placeholder='What is your goal weight?' aria-label='Your Goal Weight' step="0.01"  />
                <label htmlFor="height">Height</label>
                <input type='number' name='height' min={1} required inputMode='decimal' placeholder={`What is your height? (${heightUnit})`} aria-label='Your Height' step="0.01"  />
                <input type="hidden" name="heightUnit" value={heightUnit}/>
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