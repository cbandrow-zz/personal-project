import React from 'react'
import Results from '../Results/Results'

const ResultsHolder = ({cars, loadingStatus, error}) =>{
  return (
    <section className = "results-holder">
      {lengthMessage(cars, error)}
      {loading(loadingStatus)}
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

const lengthMessage = (cars, error)=>{
  if(cars.length > 1){
      return(
        <h3>Your uploaded image may one of the following Models or Trims: </h3>
      )
    } else if (cars.length === 1) {
      return(
        <h3>The car is: </h3>
      )
    } else if (error === true){
      return(
        <h3>Please Try Again.</h3>
      )
    }
}

const loading = (loadingStatus) => {
  if(loadingStatus === true){
    return (
      <div className = "loading-image">
        <img width = '125px' src = "../../assets/images/loading.gif"/>
        <h3>Loading Results...</h3>
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default ResultsHolder
