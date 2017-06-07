import React from 'react'

const Results = ({car, handleResultData}) =>{
  return (
    <div onClick = {() => handleResultData(car)} className = "result">
      <h2>{car}</h2>
    </div>
  )
}

export default Results
