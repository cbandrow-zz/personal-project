export default class Helper{
  constructor(data){
    this.data = data || ''
  }

  cleanVehicleData(vehicleData){
    let reducedData = vehicleData.makes.reduce((acc, make) =>{
      if(!acc[make.name]){
        acc[make.name] = {
          name: make.name,
          models: make.models.map((model) =>{
            return {
              name: model.name.replace(/-/g, " "),
              id: model.id
            }
          })
        }
      }
      return acc
    }, {})
    return reducedData
  }

  cleanResponseData(respData){
    let newResults = respData.responses[0].webDetection.webEntities.reduce((acc, value) =>{
      if(!acc.includes(value.description) && value.description != null){
        acc.push(value.description.replace(/-/g, " "))
      }
      return acc
    }, [])

    return newResults
  }

  getPotentialMakes(apiData, carData){
    let carDataKeys = Object.keys(carData)

    let matches = []
    let matchApi = []
    apiData.forEach((data, i) =>{
       carDataKeys.forEach((make, i) =>{
        if(data != null && data.toLowerCase().includes(make.toLowerCase()) ){
          matches.push(make)
          matchApi.push(data)
        }
      })
    })

    let reducedMatches = this.reduceMatches(matches)
    return [reducedMatches, matchApi]
  }

  getPotentialModels(apiData, carData, reducedMatches){
    let results = []
    apiData.forEach((data, i) =>{
      reducedMatches.forEach((match)=>{
        let formatData = data.toLowerCase().replace(`${match.toLowerCase()} `, '')
        carData[match].models.forEach((model)=>{
          let formatModelName = model.name.toLowerCase()
          let formatModelId = model.id.toLowerCase()
          if (data.toLowerCase() === match.toLowerCase()){
            return
          } else if(formatData.includes(formatModelName)){
            results.push(model.id)
            return
          }
          // else if (formatModelId.includes(formatData)){
          //   results.push(model.id)
          //   return
          // }
        })
      })
    })

    let reducedResults = this.reduceMatches(results)
    return reducedResults
  }

  reduceMatches(array){
    return array.filter((data, i, arr) =>{
      return arr.indexOf(data) === i;
    })
  }
}
