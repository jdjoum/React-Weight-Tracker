import React from 'react'

// Components
import WeightEntry from './WeightEntry'

const Table = ({weights}) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                {
                    ["Entry Number", "Weight", "Date", ""].map((i, index) => (
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