import React from 'react'

// RRD Imports
import { useLoaderData, useFetcher } from "react-router-dom";

// Library Imports
import { ArrowPathIcon } from '@heroicons/react/24/solid';

// Helper Functions
import { fetchData } from '../helper';

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
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const { userName, weights, weightUnit, goalWeight, height, heightUnit, age } = useLoaderData()
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
          </div>  
        </div>           
      </div>   
      
      
    </div>
  )
}

export default Profile