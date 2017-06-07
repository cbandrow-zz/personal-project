import React from 'react'

const DisplayCarFacts = ({carData}) =>{
  return (
    <div>
      <h2>{carData.make} {carData.model}</h2>
      <p>Years Manufactured: {carData.years.map((year) =>{
        return(
          <span>{year} </span>
        )
      })}</p>
      <p>{carData.details}</p>
      <p>To find out more, visit <a href = {carData.link}>Edumunds {carData.make} and {carData.model} page</a></p>
    </div>
  )
}

export default DisplayCarFacts
