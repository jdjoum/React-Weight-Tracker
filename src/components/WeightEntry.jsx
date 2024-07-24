import React from 'react'

const WeightEntry = ({ weight, weightUnits }) => {
  return (
    <>
        <td>{weight.entryNum}</td>
        <td>{weight.weight + " " +weightUnits}</td>
        <td>{weight.date}</td>
        <td>{weight.createdAt}</td>
    </>
  )
}

export default WeightEntry