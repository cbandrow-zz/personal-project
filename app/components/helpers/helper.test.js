import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow, mount } from "enzyme";
import stubData from '../helpers/stubbeddata.js';
import Helper from './helper';
import vehicleData from './vehicleData.js'

describe('Helper Tests', () =>{

  let helper = new Helper()

  it('should clean the huge set of vehicle data, reducing the data down a lot', () =>{
    const oldData = { id: 'Tesla Model S',
        name: 'Model S',
        niceName: 'model-s',
        years:
         [ { id: 100525710, year: 2012 },
           { id: 100536530, year: 2013 },
           { id: 200690691, year: 2014 },
           { id: 200725282, year: 2015 },
           { id: 401632873, year: 2016 },
           { id: 401702527, year: 2017 }
         ]
      }

    expect(vehicleData.makes[57].models[0]).toEqual(oldData)

    let cleanVehicleData = helper.cleanVehicleData(vehicleData)

    const expectedData = { name: 'Tesla',
        models:
         [ { name: 'Model S', id: 'Tesla Model S' },
           { name: 'Model X', id: 'Tesla Model X' },
           { name: 'Roadster', id: 'Tesla Roadster' } ] }

    expect(cleanVehicleData.Tesla).toEqual(expectedData)
  })

  it('should clean responseData from the api.', () =>{

    const oldData = [ { entityId: '/g/12v_chzq_',score: 3.03784,description: '2009 Volkswagen GTI' },
        { entityId: '/m/0h5wtyy',score: 1.40464,description: 'Volkswagen' },
        { entityId: '/m/0k4j', score: 1.40408, description: 'Car' },
        { entityId: '/m/03w996y',score: 1.3789115,description: 'Volkswagen Golf Mk5' },
        { entityId: '/g/11b6dcbh2b',score: 0.90732,description: 'Volkswagen Golf GTI' },
        { entityId: '/m/07ywl',score: 0.82018,description: 'Volkswagen' },
        { entityId: '/m/03wlw06',score: 0.7791178,description: 'Volkswagen R32' },
        { entityId: '/m/07_zt',score: 0.75044,description: 'Volkswagen Group' },
        { entityId: '/m/03fdbx',score: 0.70528,description: 'Car tuning' },
        { entityId: '/m/037hz', score: 0.47978, description: 'Golf' },
        { entityId: '/m/03w43x',score: 0.43133,description: 'Wallpaper' },
        { entityId: '/m/04ggyjg',score: 0.39615056,description: 'Volkswagen Golf Mk6' },
        { entityId: '/m/047vmg8', score: 0.37042, description: 'Rim' },
        { entityId: '/m/018wwb',score: 0.126754,description: 'Volkswagen Golf' },
        { entityId: '/m/03wlvp_',score: 0.013138465,description: 'Volkswagen GTI' } ]

    expect(stubData.responses[0].webDetection.webEntities).toEqual(oldData)

    let cleanData = helper.cleanResponseData(stubData)

    let expectedData = [ '2009 Volkswagen GTI', 'Volkswagen', 'Car','Volkswagen Golf Mk5', 'Volkswagen Golf GTI', 'Volkswagen R32','Volkswagen Group','Car tuning','Golf','Wallpaper','Volkswagen Golf Mk6','Rim','Volkswagen Golf','Volkswagen GTI' ]

    expect(cleanData.length).toEqual(14)
    expect(Array.isArray(cleanData)).toBe(true)
    expect(cleanData).toEqual(expectedData)
  })

  it('should grab the potential makes of a api data', () =>{
    let cleanResponse = helper.cleanResponseData(stubData)
    let cleanVehicleData = helper.cleanVehicleData(vehicleData)

    let arrayData = ["2009 Volkswagen GTI", "Volkswagen", "Volkswagen Golf Mk5", "Volkswagen Golf GTI", "Volkswagen R32", "Volkswagen Group", "Volkswagen Golf Mk6", "Volkswagen Golf", "Volkswagen GTI"]

    let expectedData = [['Volkswagen'], arrayData]

    let result = helper.getPotentialMakes(cleanResponse, cleanVehicleData)
    expect(result).toEqual(expectedData);
    expect(result[0].length).toEqual(1)
    expect(result[1].length).toEqual(9)
  })

  it('should grab potential models from api data', ()=>{
    let cleanResponse = helper.cleanResponseData(stubData)
    let cleanVehicleData = helper.cleanVehicleData(vehicleData)
    let modelMatches = ["Volkswagen"]
    let arrayData = ["2009 Volkswagen GTI", "Volkswagen", "Volkswagen Golf Mk5", "Volkswagen Golf GTI", "Volkswagen R32", "Volkswagen Group", "Volkswagen Golf Mk6", "Volkswagen Golf", "Volkswagen GTI"]

    let result = helper.getPotentialModels(arrayData, cleanVehicleData, modelMatches)

    expect(result).toEqual(["Volkswagen GTI", "Volkswagen Golf", "Volkswagen Golf GTI", "Volkswagen R32"])
  })

  it('should reduce the matches array when multiple makes are selected', () =>{
    let array = ['Volkswagen', 'Volkswagen', 'Subaru', 'Ford', 'Ford', 'Ford', 'Chevrolet', 'Mazda']
    let results = helper.reduceMatches(array)

    expect(results).toEqual(['Volkswagen', 'Subaru', 'Ford', 'Chevrolet', 'Mazda'])
  })


})
