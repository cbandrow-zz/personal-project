import React from 'react'

const DisplayCarFacts = ({carData}) =>{
  return (
    <div>
      <h2>{carData.make} {carData.model}</h2>
      <p>Years Manufactured: {carData.years.map((year, i) =>{
        if(i === carData.years.length - 1){
          return(
            <span>{year} </span>
          )
        } else {
          return(
            <span>{year}, </span>
          )
        }
      })}</p>
      <p className = "details">{carData.details}</p>
      <p>To find out more, visit <a href = {carData.link}>Edumunds {carData.make} and {carData.model} page</a></p>
    </div>
  )
}

export default DisplayCarFacts
