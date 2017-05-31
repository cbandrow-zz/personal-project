import React from 'react'
import Results from '../Results/Results'

const ResultsHolder = ({cars}) =>{
  return (
    <section className = "results-holder">
      {loading(cars)}
      {lengthMessage(cars)}
      {cars.map((car, i)=>{
        return(
          <div key = {i}>
            <Results car = {car}/>
          </div>
        )
      })}
    </section>
  )
}

const lengthMessage = (cars)=>{
  if(cars.length > 1){
      return(
        <h3>Your uploaded image may be: </h3>
      )
    } else if (cars.length === 1) {
      return(
        <h3>The car is: </h3>
      )
  }
}

const loading = (cars) => {
  if(!cars){
    return (
      <div>
        <img src = "../assets/images/loading.gif"/>
      </div>
    )
  }
}

export default ResultsHolder
