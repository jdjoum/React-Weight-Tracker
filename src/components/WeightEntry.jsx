import React from 'react'

// Helper Functions
import { formatDateToLocaleString } from '../helper'

const WeightEntry = ({weight}) => {
  return (
    <>
        <td>{weight.entryNum}</td>
        <td>{weight.weight}</td>
        <td>{formatDateToLocaleString(weight.createdAt)}</td>
    </>
  )
}

export default WeightEntry