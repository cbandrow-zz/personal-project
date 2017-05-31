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
            "maxResults": 10,
          }
        ],
      }
    ]
  }
  return data
};

export default jsonData
