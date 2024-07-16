import React from 'react'

const Table = (weights) => {
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
                /* {
                    expenses.map((expense) => (
                        <tr key={expense.id}>
                            <ExpenseItem expense={expense} showBudget={showBudget}/>
                        </tr>    
                    ))
                } */}
            </tbody>
        </table>
    </div>
  )
}

export default Table