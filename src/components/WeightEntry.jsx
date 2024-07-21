import React from 'react'

const WeightEntry = ({weight}) => {
  return (
    <>
        <td>{weight.entryNum}</td>
        <td>{weight.weight}</td>
        <td>{weight.date}</td>
        <td>{weight.createdAt}</td>
    </>
  )
}

export default WeightEntry