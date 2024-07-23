import React from 'react'

// Components
import WeightEntry from './WeightEntry'

const Table = ({ weights,  weightUnits }) => {
    const weightUnitsStr = JSON.stringify(weightUnits);
    // Unquote the units string from JSON.stringify
    const unquotedUnits = weightUnits.replace(/"([^"]+)":/g, '$1:');
    return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                {
                    ["Entry Number", "Weight (" + unquotedUnits + ")", "Date", "Created At"].map((i, index) => (
                        <th key={index}>{i}</th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
                {
                // TODO: Create row for each weight entry
                    weights?.map((weight) => (
                            <tr key={weight.id}>
                                <WeightEntry weight={weight} />
                            </tr>    
                    ))
                }
            </tbody>
        </table>
    </div>
    )
}

export default Table