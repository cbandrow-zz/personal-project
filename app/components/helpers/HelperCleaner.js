export default class HelperCleaner{
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
    }, [])
    return reducedData
  }

  cleanResponseData(){
    
  }
}
