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
              name: model.name,
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
        acc.push(value.description)
      }
      return acc
    }, [])

    return newResults
  }

  compareData(apiData, carData){
    //  carData[reducedMatches[i]].models.forEach((model) =>{
    //    console.log(data)
    //    console.log(model.id, model.name)
     //
    //    if(model.name.toLowerCase().includes(data) || model.id.toLowerCase().includes(data)){
    //      results.push(model.id)
    //    }
     //
    //  })
    //  if(cleanData.toLowerCase().includes(model.name.toLowerCase()) || cleanData.toLowerCase().includes(model.id.toLowerCase())){
    //    results.push(model.id)
    //  }
  }
}
