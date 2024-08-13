import React, { useState, useEffect } from 'react'

// RRD Imports
import { useLoaderData, useFetcher } from "react-router-dom";

// Library Imports
import { ArrowPathIcon } from '@heroicons/react/24/solid';

// Helper functions
import { convertGoalWeight, convertHeight, convertweightUnit, fetchData } from '../helper';

// profileLoader - Loads the info needed from localStorage for the components within the profile page
export function profileLoader() {
  const userName = fetchData("userName");
  const weights = fetchData("weights");
  const goalWeight = fetchData("goalWeight");
  const weightUnit = fetchData("weightUnit");
  const height = fetchData("height");
  const heightUnit = fetchData("heightUnit");
  const age = fetchData("age");
  return { userName, weights, weightUnit, goalWeight, heightUnit, height, age }
}

const Profile = () => {
  const { userName, weights, weightUnit, goalWeight, height, heightUnit, age } = useLoaderData()
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  // State variables
  const [weightUnitVal, setWeightUnitVal] = useState(weightUnit);
  const [targetWeight, setTargetWeight] = useState(goalWeight);
  const [heightVal, setHeightVal] = useState(height);
  const [heightUnitVal, setHeightUnitVal] = useState(heightUnit);
  const [count, setCount] = useState(0);

  useEffect(() => {
      if(!isSubmitting) {
          // Reset the form and focus on the first input once submitted
          const existingWeights = fetchData("weights") ?? [];
          const goalWeight = fetchData("goalWeight");
          setTargetWeight(goalWeight);
      }
  }, [isSubmitting])

  useEffect(() => {
      localStorage.setItem("weightUnit", JSON.stringify(weightUnitVal));
      localStorage.setItem("heightUnit", JSON.stringify(heightUnitVal));
  }, [weightUnitVal, heightUnitVal])

  // handleToggle - Handles the logic when the change weight and height unit toggle button is clicked
  const handleToggle = () => {
    setCount(count + 1);
    // Update the weightUnit in localStorage and the state variable
    setWeightUnitVal(prevUnits => (prevUnits === 'kg' ? 'lbs' : 'kg'));
    localStorage.setItem("weightUnit", JSON.stringify(weightUnitVal));
    // Convert the existingWeights based on the weightUnit change
    const existingWeights = fetchData("weights") ?? [];
    var newWeights = convertweightUnit(existingWeights, weightUnitVal);
    localStorage.setItem("weights", JSON.stringify(newWeights));
    // Convert the goalWeight based on the weightUnit change
    var newGoalWeight = convertGoalWeight(targetWeight, weightUnitVal);
    localStorage.setItem("goalWeight", JSON.stringify(newGoalWeight));
    setTargetWeight(newGoalWeight);
    // Update the heightUnit in localStorage
    setHeightUnitVal(prevUnits => (prevUnits === 'meters' ? 'inches' : 'meters'));
    localStorage.setItem("heightUnit", JSON.stringify(heightUnitVal));
    // Convert the height based on the heightUnit change
    var newHeight = convertHeight(heightVal, heightUnitVal);
    localStorage.setItem("height", JSON.stringify(newHeight));
    setHeightVal(newHeight);
    localStorage.setItem("height", JSON.stringify(newHeight));
  };

  return (
    <div className='dashboard'>
      <h1>Manage Profile</h1>
      <div className="grid-sm"> 
        <div className="grid-lg">
          <div className="flex-lg">
              <div className="form-wrapper">
                <h2 className="h3">Update Name</h2>
                <fetcher.Form method="post">
                    <div className="grid-xs">
                      <input type='text' name='userName' required placeholder='Enter your name' aria-label='Your Name' autoComplete='given-name'/>
                      <input type="hidden" name="_action" value="updateName"/>
                      <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                          {
                              isSubmitting ? <span>Submitting...</span> : (
                                  <>
                                      <span>Update Name</span>
                                      <ArrowPathIcon width={20} />
                                  </>
                              )
                          }
                      </button>
                    </div>
                </fetcher.Form>
            </div>
            <div className="form-wrapper">
                <h2 className="h3">Update Age</h2>
                <fetcher.Form method="post">
                    <div className="grid-xs">
                      <input type='number' name='age' min={1} required inputMode='decimal' placeholder={`Enter your age`} aria-label='Your Age' />
                      <input type="hidden" name="_action" value="updateAge"/>
                      <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                          {
                              isSubmitting ? <span>Submitting...</span> : (
                                  <>
                                      <span>Update Age</span>
                                      <ArrowPathIcon width={20} />
                                  </>
                              )
                          }
                      </button>
                    </div>
                </fetcher.Form>
            </div>
            <div className='form-wrapper'>
                <h2 className="h3">Change Weight & Height Units</h2>
                <button type="submit" className='btn btn--dark' disabled={isSubmitting} onClick={handleToggle}>
                    {
                        isSubmitting ? <span>Submitting...</span> : (
                            <>
                                <span>{weightUnitVal === 'lbs' ? 'Change units to kg and meters' : 'Change units to lbs and inches'}</span>
                                <ArrowPathIcon width={20} />
                            </>
                        )
                    }
                </button>
            </div>
            <div className='form-wrapper'>
                <h2 className="h3">Update Goal Weight</h2>
                <fetcher.Form method="post">
                    <div className="grid-xs">
                        <input type="number" step="0.01" name="newGoalWeight" id="newGoalWeight" placeholder={`Enter your goal weight (${weightUnitVal})`} required inputMode='decimal' />
                        <input type="hidden" name="_action" value="updateGoalWeight"/>
                        <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                            {
                                isSubmitting ? <span>Submitting...</span> : (
                                    <>
                                        <span>Update Goal Weight</span>
                                        <ArrowPathIcon width={20} />
                                    </>
                                )
                            }
                        </button>
                    </div>
                </fetcher.Form>
            </div>
            <div className="form-wrapper">
                <h2 className="h3">Update Height</h2>
                <fetcher.Form method="post">
                    <div className="grid-xs">
                      <input type='number' name='height' min={1} required inputMode='decimal' placeholder={`Enter your height (${heightUnitVal})`} aria-label='Your Height' step="0.01"  />
                      <input type="hidden" name="_action" value="updateHeight"/>
                      <button type="submit" className='btn btn--dark' disabled={isSubmitting}>
                          {
                              isSubmitting ? <span>Submitting...</span> : (
                                  <>
                                      <span>Update Height</span>
                                      <ArrowPathIcon width={20} />
                                  </>
                              )
                          }
                      </button>
                    </div>
                </fetcher.Form>
            </div>       
          </div>  
        </div>           
      </div>   
      
      
    </div>
  )
}

export default Profile