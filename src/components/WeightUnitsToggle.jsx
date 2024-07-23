import React, { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';

// Library Imports
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const WeightUnitsToggle = ({ weights, weightUnits, onTrigger }) => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const [unit, setUnit] = useState(weightUnits);

    // Effect hook to update localStorage whenever `unit` changes
    useEffect(() => {
        try {
          localStorage.setItem("weightUnits", JSON.stringify(unit));
        } catch (e) {
          console.error("There was a problem saving the weight units.", e);
        }
    }, [unit]); // Runs every time `unit` changes

    const handleToggle = () => {
        setUnit(prevUnits => (prevUnits === 'kgs' ? 'lbs' : 'kgs'));
    };

//   const convertWeight = (weight) => {
//     return unit === 'lbs' ? weight : (weight * 0.45359237).toFixed(2);
//   };

  return (
    <div className='form-wrapper'>
        <h2 className="h3">Change Weight Units</h2>
        <button type="submit" className='btn btn--dark' disabled={isSubmitting} onClick={handleToggle}>
            {
                isSubmitting ? <span>Submitting...</span> : (
                    <>
                        <span>{unit === 'lbs' ? 'Show Weight History in kgs' : 'Show Weight History in lbs'}</span>
                        <ArrowPathIcon width={20} />
                    </>
                )
            }
        </button>
    </div>
  );
};

export default WeightUnitsToggle;
