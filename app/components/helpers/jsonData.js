const jsonData = (content) => {
  let data = {
    "requests":[
      {
        "image":{
          "content":`${content}`
        },
        "features":[
          {
            "type":"TYPE_UNSPECIFIED",
            "maxResults":10
          }
        ]
      }
    ]
  }
  return data
};

export default jsonData
