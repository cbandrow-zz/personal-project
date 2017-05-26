const jsonData = (content) => {
  let data = {
    "requests": [
      {
        "image": {
          "content": `${content}`
        },
        "features": [
          {
            "type": "WEB_DETECTION",
            "maxResults": 50
          }
        ],
        "imageContext": {
          "cropHintsParams": {
            "aspectRatios": [0.8, 1, 1.2]
          }
        }
      }
    ]
  }
  return data
};

export default jsonData
